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
    return res.status(403).json({ message: 'Apenas presenças VIP podem se candidatar' });
  }

  if (req.method === 'POST') {
    try {
      const { eventId } = req.body;

      if (!eventId) {
        return res.status(400).json({ message: 'ID do evento é obrigatório' });
      }

      // Verificar se o evento existe e está ativo
      const event = await prisma.event.findUnique({
        where: { id: eventId }
      });

      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      if (event.status !== 'active') {
        return res.status(400).json({ message: 'Este evento não está mais aceitando candidaturas' });
      }

      // Verificar se já existe uma candidatura
      const existingApplication = await prisma.application.findFirst({
        where: {
          eventId,
          presencaVipId: session.user.id
        }
      });

      if (existingApplication) {
        return res.status(400).json({ message: 'Você já se candidatou para este evento' });
      }

      // Verificar conflitos de horário
      const eventDate = event.date;
      const startTime = new Date(eventDate);
      const endTime = new Date(eventDate);
      endTime.setHours(endTime.getHours() + 6); // Assumindo que cada evento dura 6 horas

      const conflictingEvents = await prisma.application.findFirst({
        where: {
          presencaVipId: session.user.id,
          status: 'approved',
          event: {
            date: {
              gte: startTime,
              lte: endTime
            }
          }
        },
        include: {
          event: true
        }
      });

      if (conflictingEvents) {
        return res.status(400).json({ 
          message: 'Você já tem um evento aprovado neste horário' 
        });
      }

      // Criar a candidatura
      const application = await prisma.application.create({
        data: {
          eventId,
          presencaVipId: session.user.id,
          status: 'pending'
        }
      });

      return res.status(201).json({
        id: application.id,
        status: application.status,
        createdAt: application.createdAt.toISOString()
      });
    } catch (error) {
      console.error('Erro ao criar candidatura:', error);
      return res.status(500).json({ message: 'Erro ao criar candidatura' });
    }
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
