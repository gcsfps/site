import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { hash } from 'bcryptjs';
import { subscriptionConfig } from '../../../config/subscription';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password, type } = req.body;

    // Verifica se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const hashedPassword = await hash(password, 8);

    // Prepara os dados da assinatura para promoters
    const subscriptionData = type === 'organizer' && subscriptionConfig.enableFreeTrial
      ? {
          subscription: {
            create: {
              plan: subscriptionConfig.freeTrialPlan,
              status: 'active',
              startDate: new Date(),
              endDate: new Date(Date.now() + subscriptionConfig.freeTrialDays * 24 * 60 * 60 * 1000),
            },
          },
        }
      : {};

    // Cria o usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        type,
        ...subscriptionData,
      },
      include: {
        subscription: true,
      },
    });

    // Remove a senha do retorno
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Erro ao criar conta' });
  }
}
