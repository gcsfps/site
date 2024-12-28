import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, name, type, whatsapp } = req.body;

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criar novo usuário
    const user = await prisma.user.create({
      data: {
        email,
        password, // Em produção, deve-se fazer hash da senha
        name,
        type,
        ...(type === 'presenca_vip' ? { whatsapp } : {}),
        subscription: type === 'organizer' ? {
          plan: 'basic',
          status: 'active',
          features: {
            maxEvents: 5,
            maxPresencasPerEvent: 50,
            analytics: false,
            prioritySupport: false,
            customBranding: false,
            profileAccess: true,
          }
        } : null
      }
    });

    // Remover a senha do objeto retornado
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
}
