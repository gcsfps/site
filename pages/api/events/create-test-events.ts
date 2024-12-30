import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    // Array com dados dos eventos de teste
    const testEvents = [
      {
        name: 'Festa de Ano Novo',
        date: '2024-12-31',
        time: '22:00',
        location: 'Clube Test, São Paulo',
        totalSpots: 100,
        payment: 'Entrada: R$ 50,00',
        description: 'Venha celebrar a virada do ano conosco! Open bar, música ao vivo e muito mais.',
        promoterId: userId,
        status: 'active'
      },
      {
        name: 'Pool Party de Verão',
        date: '2024-01-15',
        time: '14:00',
        location: 'Mansão Test, São Paulo',
        totalSpots: 50,
        payment: 'Entrada: R$ 80,00',
        description: 'A melhor pool party do verão! DJs internacionais, drinks especiais e muita diversão.',
        promoterId: userId,
        status: 'active'
      },
      {
        name: 'Baile de Carnaval',
        date: '2024-02-10',
        time: '20:00',
        location: 'Test Club, São Paulo',
        totalSpots: 200,
        payment: 'Entrada: R$ 40,00',
        description: 'O melhor carnaval da cidade! Venha fantasiado e aproveite as marchinhas e muito axé.',
        promoterId: userId,
        status: 'active'
      }
    ];

    // Criar os eventos
    const createdEvents = await Promise.all(
      testEvents.map(event => 
        prisma.event.create({
          data: event
        })
      )
    );

    return res.status(200).json({ events: createdEvents });
  } catch (error) {
    console.error('Erro ao criar eventos de teste:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
