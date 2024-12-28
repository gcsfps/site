import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session || session.user.type !== 'presenca_vip') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { eventId, date } = req.body;
    const eventDate = new Date(date);

    // Buscar eventos aprovados do usuário no mesmo dia
    const userApplications = await prisma.application.findMany({
      where: {
        presencaVipId: session.user.id,
        status: 'approved',
      },
      include: {
        event: true,
      },
    });

    // Verificar se há conflito de horário
    const hasConflict = userApplications.some(application => {
      const applicationDate = new Date(application.event.date);
      
      // Verificar se é no mesmo dia
      if (applicationDate.toDateString() !== eventDate.toDateString()) {
        return false;
      }

      // Verificar se há sobreposição de horário (considerando 6 horas de duração)
      const eventStart = eventDate.getTime();
      const eventEnd = eventStart + (6 * 60 * 60 * 1000); // 6 horas em milissegundos
      
      const applicationStart = applicationDate.getTime();
      const applicationEnd = applicationStart + (6 * 60 * 60 * 1000);

      return (
        (eventStart >= applicationStart && eventStart < applicationEnd) ||
        (eventEnd > applicationStart && eventEnd <= applicationEnd) ||
        (eventStart <= applicationStart && eventEnd >= applicationEnd)
      );
    });

    return res.status(200).json({ hasConflict });
  } catch (error) {
    console.error('Error checking conflicts:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
