import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session || session.user.type !== 'presenca_vip') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Buscar todas as candidaturas do usuário
    const applications = await prisma.application.findMany({
      where: {
        presencaVipId: session.user.id,
      },
      include: {
        event: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
