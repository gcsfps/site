import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { logger } from '../../../src/lib/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  switch (req.method) {
    case 'POST':
      try {
        const { eventId, rating, comment } = req.body;
        
        // Validações
        if (!eventId || !rating || rating < 1 || rating > 5) {
          return res.status(400).json({ message: 'Dados inválidos' });
        }

        // Verifica se o usuário já avaliou este evento
        const existingReview = await prisma.review.findFirst({
          where: {
            eventId,
            userId: session.user.id,
          },
        });

        if (existingReview) {
          return res.status(400).json({ message: 'Você já avaliou este evento' });
        }

        // Cria a avaliação
        const review = await prisma.review.create({
          data: {
            eventId,
            userId: session.user.id,
            rating,
            comment,
          },
        });

        logger.info('Review created', { reviewId: review.id, eventId });
        return res.status(201).json(review);

      } catch (error) {
        logger.error('Error creating review', { error });
        return res.status(500).json({ message: 'Erro ao criar avaliação' });
      }

    case 'GET':
      try {
        const { eventId } = req.query;

        if (!eventId) {
          return res.status(400).json({ message: 'ID do evento é obrigatório' });
        }

        const reviews = await prisma.review.findMany({
          where: { eventId: String(eventId) },
          include: {
            user: {
              select: {
                name: true,
                profileImage: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        return res.status(200).json(reviews);

      } catch (error) {
        logger.error('Error fetching reviews', { error });
        return res.status(500).json({ message: 'Erro ao buscar avaliações' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
