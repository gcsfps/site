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

    const { eventId } = req.body;

    // Verificar se o evento existe
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Verificar se já existe uma candidatura
    const existingApplication = await prisma.application.findFirst({
      where: {
        eventId,
        presencaVipId: session.user.id,
      },
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Application already exists' });
    }

    // Criar nova candidatura
    const application = await prisma.application.create({
      data: {
        eventId,
        presencaVipId: session.user.id,
        status: 'pending',
      },
    });

    return res.status(201).json(application);
  } catch (error) {
    console.error('Error applying to event:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
