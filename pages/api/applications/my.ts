import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    if (session.user.type !== 'vip') {
      return res.status(403).json({ message: 'Apenas usuários VIP podem ver suas candidaturas' });
    }

    const applications = await prisma.application.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        event: {
          include: {
            organizer: {
              select: {
                name: true,
                establishmentName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Formatar os dados para retornar apenas as informações necessárias
    const formattedApplications = applications.map(app => ({
      id: app.event.id,
      name: app.event.name,
      description: app.event.description,
      date: app.event.date,
      time: app.event.time,
      location: app.event.location,
      flyerUrl: app.event.flyerUrl,
      status: app.status,
      organizer: app.event.organizer,
    }));

    return res.json(formattedApplications);
  } catch (error) {
    console.error('Erro ao buscar candidaturas:', error);
    return res.status(500).json({ 
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
