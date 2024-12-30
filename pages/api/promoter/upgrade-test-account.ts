import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Atualizar o usuário para Ultimate
    const user = await prisma.user.update({
      where: { email },
      data: {
        subscription: {
          upsert: {
            create: {
              plan: 'Ultimate',
              status: 'active',
              startDate: new Date(),
              endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
              maxEvents: -1,
              maxPresencasPerEvent: -1,
              maxFlyersPerMonth: -1,
              analytics: true,
              prioritySupport: true,
              customBranding: true,
              profileAccess: true
            },
            update: {
              plan: 'Ultimate',
              status: 'active',
              startDate: new Date(),
              endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
              maxEvents: -1,
              maxPresencasPerEvent: -1,
              maxFlyersPerMonth: -1,
              analytics: true,
              prioritySupport: true,
              customBranding: true,
              profileAccess: true
            }
          }
        }
      }
    });

    // Criar eventos de teste usando a nova rota
    const createEventsResponse = await fetch('http://localhost:3000/api/promoter/create-test-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!createEventsResponse.ok) {
      throw new Error('Erro ao criar eventos de teste');
    }

    const eventsData = await createEventsResponse.json();

    return res.status(200).json({ 
      message: 'Conta atualizada com sucesso',
      user,
      events: eventsData.events
    });
  } catch (error) {
    console.error('Erro ao atualizar conta:', error);
    return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
}
