import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { logger } from '../../../src/lib/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    if (session.user.type !== 'promoter') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    // Buscar estatísticas do promoter
    const [
      totalEvents,
      activeEvents,
      applications,
      confirmedPresences
    ] = await Promise.all([
      // Total de eventos
      prisma.event.count({
        where: { organizerId: session.user.id }
      }),

      // Eventos ativos
      prisma.event.count({
        where: {
          organizerId: session.user.id,
          status: 'active'
        }
      }),

      // Todas as inscrições
      prisma.application.findMany({
        where: {
          event: {
            organizerId: session.user.id
          }
        }
      }),

      // Presenças confirmadas
      prisma.application.count({
        where: {
          event: {
            organizerId: session.user.id
          },
          status: 'confirmed'
        }
      })
    ]);

    // Calcular inscrições pendentes
    const pendingApplications = applications.filter(app => app.status === 'pending').length;

    logger.info('Dashboard stats fetched', {
      promoterId: session.user.id,
      totalEvents,
      activeEvents,
      totalApplications: applications.length,
      pendingApplications,
      confirmedPresences
    });

    return res.status(200).json({
      totalEvents,
      activeEvents,
      totalApplications: applications.length,
      pendingApplications,
      confirmedPresences
    });

  } catch (error) {
    logger.error('Error fetching dashboard stats', { error });
    return res.status(500).json({ message: 'Erro ao buscar estatísticas' });
  }
}
