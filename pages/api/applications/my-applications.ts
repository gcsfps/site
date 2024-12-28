import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  if (session.user.type !== 'presence') {
    return res.status(403).json({ message: 'Acesso restrito a presenças VIP' });
  }

  if (req.method === 'GET') {
    try {
      const applications = await prisma.application.findMany({
        where: {
          presencaVipId: session.user.id
        },
        include: {
          event: {
            select: {
              id: true,
              name: true,
              date: true,
              time: true,
              location: true,
              flyerUrl: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // Formatar as datas
      const formattedApplications = applications.map(app => ({
        ...app,
        createdAt: app.createdAt.toISOString(),
        event: {
          ...app.event,
          date: app.event.date.toISOString()
        }
      }));

      return res.status(200).json(formattedApplications);
    } catch (error) {
      console.error('Erro ao buscar candidaturas:', error);
      return res.status(500).json({ message: 'Erro ao buscar candidaturas' });
    }
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
