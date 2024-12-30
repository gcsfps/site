import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const events = await prisma.event.findMany({
      where: {
        status: 'active',
      },
      orderBy: {
        date: 'asc',
      },
      include: {
        organizer: {
          select: {
            name: true,
            establishment: true,
          },
        },
      },
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
