import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

const plans = {
  Basic: {
    maxEvents: 3,
    maxPresencasPerEvent: 10,
    maxFlyersPerMonth: 4,
    analytics: false,
    prioritySupport: false,
    customBranding: false,
    profileAccess: true
  },
  Premium: {
    maxEvents: 5,
    maxPresencasPerEvent: 20,
    maxFlyersPerMonth: -1, // ilimitado
    analytics: true,
    prioritySupport: true,
    customBranding: false,
    profileAccess: true
  },
  Ultimate: {
    maxEvents: -1, // ilimitado
    maxPresencasPerEvent: -1, // ilimitado
    maxFlyersPerMonth: -1, // ilimitado
    analytics: true,
    prioritySupport: true,
    customBranding: true,
    profileAccess: true
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const { plan } = req.body;

    // Validar o plano
    if (!['Basic', 'Premium', 'Ultimate'].includes(plan)) {
      return res.status(400).json({ message: 'Plano inválido' });
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
      include: { subscription: true }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (user.type !== 'promoter') {
      return res.status(400).json({ message: 'Apenas promoters podem assinar planos' });
    }

    // Configurar a data de término (30 dias a partir de agora)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    // Criar ou atualizar a assinatura
    const subscription = await prisma.subscription.upsert({
      where: {
        userId: user.id
      },
      create: {
        userId: user.id,
        plan,
        status: 'active',
        endDate,
        ...plans[plan as keyof typeof plans]
      },
      update: {
        plan,
        status: 'active',
        endDate,
        ...plans[plan as keyof typeof plans]
      }
    });

    return res.status(200).json({ subscription });
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    return res.status(500).json({ 
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
