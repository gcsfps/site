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

    const { plan, isTestPromoter } = req.body;

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

    // Calcular data de término
    const startDate = new Date();
    const endDate = new Date();
    
    // Se for o promoter de teste, dá 1 ano de Ultimate
    // Se for promoter normal, dá 1 mês de Basic
    if (isTestPromoter) {
      endDate.setFullYear(endDate.getFullYear() + 1); // 1 ano
      plan = 'Ultimate';
    } else {
      endDate.setMonth(endDate.getMonth() + 1); // 1 mês
      plan = 'Basic';
    }

    // Criar ou atualizar assinatura
    const subscription = await prisma.subscription.upsert({
      where: {
        userId: user.id
      },
      update: {
        plan: plan,
        status: 'active',
        startDate: startDate,
        endDate: endDate,
        ...plans[plan as keyof typeof plans]
      },
      create: {
        userId: user.id,
        plan: plan,
        status: 'active',
        startDate: startDate,
        endDate: endDate,
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
