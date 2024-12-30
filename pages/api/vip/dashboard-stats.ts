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

    if (session.user.type !== 'vip') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    // Buscar estatísticas do VIP
    const [applications, upcomingEvents] = await Promise.all([
      // Todas as inscrições do VIP
      prisma.application.findMany({
        where: {
          presencaVipId: session.user.id
        }
      }),

      // Próximos eventos que o VIP está inscrito
      prisma.event.findMany({
        where: {
          applications: {
            some: {
              presencaVipId: session.user.id
            }
          },
          date: {
            gte: new Date()
          }
        },
        orderBy: {
          date: 'asc'
        },
        take: 5,
        select: {
          id: true,
          name: true,
          date: true,
          time: true,
          location: true,
          applications: {
            where: {
              presencaVipId: session.user.id
            },
            select: {
              status: true
            }
          }
        }
      })
    ]);

    // Calcular estatísticas
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(app => app.status === 'pending').length;
    const confirmedApplications = applications.filter(app => app.status === 'confirmed').length;

    // Formatar eventos próximos
    const formattedUpcomingEvents = upcomingEvents.map(event => ({
      id: event.id,
      name: event.name,
      date: event.date.toISOString(),
      time: event.time,
      location: event.location,
      status: event.applications[0]?.status || 'pending'
    }));

    logger.info('VIP dashboard stats fetched', {
      vipId: session.user.id,
      totalApplications,
      pendingApplications,
      confirmedApplications,
      upcomingEventsCount: formattedUpcomingEvents.length
    });

    return res.status(200).json({
      totalApplications,
      pendingApplications,
      confirmedApplications,
      upcomingEvents: formattedUpcomingEvents
    });

  } catch (error) {
    logger.error('Error fetching VIP dashboard stats', { error });
    return res.status(500).json({ message: 'Erro ao buscar estatísticas' });
  }
}
