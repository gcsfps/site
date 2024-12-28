import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      const event = await prisma.event.findUnique({
        where: { id: String(id) },
        include: {
          organizer: {
            select: {
              name: true,
              establishmentName: true
            }
          }
        }
      });

      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      // Se o evento não estiver ativo e o usuário não for o organizador, não mostrar
      if (event.status !== 'active' && session?.user?.id !== event.organizerId) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      // Converter a data para string ISO
      const formattedEvent = {
        ...event,
        date: event.date.toISOString()
      };

      return res.status(200).json(formattedEvent);
    } catch (error) {
      console.error('Erro ao buscar evento:', error);
      return res.status(500).json({ message: 'Erro ao buscar evento' });
    }
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
