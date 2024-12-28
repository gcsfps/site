import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session?.user?.email) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  if (req.method === 'POST') {
    try {
      const { name, date, time, location, totalSpots, payment, description } = req.body;
      const flyerUrl = req.body.flyerUrl || '';

      const event = await prisma.event.create({
        data: {
          name,
          date: new Date(`${date}T${time}`),
          location,
          totalSpots: parseInt(totalSpots),
          payment,
          description,
          flyerUrl,
          organizerId: session.user.id,
          status: 'active'
        }
      });

      return res.status(201).json(event);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      return res.status(500).json({ message: 'Erro ao criar evento' });
    }
  }

  if (req.method === 'GET') {
    try {
      const events = await prisma.event.findMany({
        where: {
          OR: [
            { status: 'active' },
            { organizerId: session.user.id }
          ]
        },
        orderBy: {
          date: 'asc'
        }
      });

      return res.status(200).json(events);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      return res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
