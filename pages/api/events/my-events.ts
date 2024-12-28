import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });

    if (!session || session.user.type !== 'promoter') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const events = await prisma.event.findMany({
      where: {
        organizerId: session.user.id
      },
      orderBy: {
        date: 'asc'
      }
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
