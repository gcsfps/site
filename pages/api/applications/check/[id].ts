import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  if (session.user.type !== 'presence') {
    return res.status(403).json({ message: 'Apenas presenças VIP podem se candidatar' });
  }

  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      const application = await prisma.application.findFirst({
        where: {
          eventId: String(id),
          presencaVipId: session.user.id
        }
      });

      if (!application) {
        return res.status(404).json(null);
      }

      return res.status(200).json({
        id: application.id,
        status: application.status,
        createdAt: application.createdAt.toISOString()
      });
    } catch (error) {
      console.error('Erro ao verificar candidatura:', error);
      return res.status(500).json({ message: 'Erro ao verificar candidatura' });
    }
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
