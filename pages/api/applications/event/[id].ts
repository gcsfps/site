import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const eventId = req.query.id as string;

  // Verificar se o usuário é o organizador do evento
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { organizerId: true }
  });

  if (!event || event.organizerId !== session.user.id) {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  if (req.method === 'GET') {
    try {
      const applications = await prisma.application.findMany({
        where: { eventId },
        include: {
          presencaVip: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return res.status(200).json(applications);
    } catch (error) {
      console.error('Erro ao buscar candidaturas:', error);
      return res.status(500).json({ message: 'Erro ao buscar candidaturas' });
    }
  }

  if (req.method === 'PUT') {
    const { applicationId, status } = req.body;

    if (!applicationId || !status) {
      return res.status(400).json({ message: 'Dados inválidos' });
    }

    try {
      // Verificar se a candidatura existe e pertence ao evento
      const application = await prisma.application.findFirst({
        where: {
          id: applicationId,
          eventId
        }
      });

      if (!application) {
        return res.status(404).json({ message: 'Candidatura não encontrada' });
      }

      // Se estiver aprovando, verificar conflitos de horário
      if (status === 'APPROVED') {
        const event = await prisma.event.findUnique({
          where: { id: eventId },
          select: { date: true, time: true }
        });

        if (!event) {
          return res.status(404).json({ message: 'Evento não encontrado' });
        }

        // Verificar outras candidaturas aprovadas no mesmo dia
        const conflictingApplications = await prisma.application.findMany({
          where: {
            presencaVipId: application.presencaVipId,
            status: 'APPROVED',
            id: { not: applicationId },
            event: {
              date: event.date,
              time: event.time
            }
          }
        });

        if (conflictingApplications.length > 0) {
          return res.status(400).json({ 
            message: 'A presença VIP já tem um evento aprovado neste horário' 
          });
        }
      }

      // Atualizar o status da candidatura
      const updatedApplication = await prisma.application.update({
        where: { id: applicationId },
        data: { status }
      });

      return res.status(200).json(updatedApplication);
    } catch (error) {
      console.error('Erro ao atualizar candidatura:', error);
      return res.status(500).json({ message: 'Erro ao atualizar candidatura' });
    }
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
