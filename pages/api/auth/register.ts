import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { hash } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      name, 
      email, 
      password, 
      type,
      whatsapp,
      establishmentName,
      address,
      phone,
      description
    } = req.body;

    // Validar campos obrigatórios
    if (!name || !email || !password || !type) {
      return res.status(400).json({ 
        message: 'Campos obrigatórios faltando',
        required: ['name', 'email', 'password', 'type']
      });
    }

    // Validar o tipo de usuário
    const validTypes = ['promoter', 'vip'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ 
        message: 'Tipo de usuário inválido',
        validTypes
      });
    }

    // Verifica se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const hashedPassword = await hash(password, 8);

    // Prepara os dados do usuário
    const userData = {
      name,
      email,
      password: hashedPassword,
      type,
      whatsapp: type === 'vip' ? whatsapp : null,
      establishmentName: type === 'promoter' ? establishmentName : null,
      address: type === 'promoter' ? address ? JSON.parse(JSON.stringify(address)) : null : null,
      phone: type === 'promoter' ? phone : null,
      description: type === 'promoter' ? description : null
    };

    // Cria o usuário
    const user = await prisma.user.create({
      data: {
        ...userData,
        // Promoters começam com uma assinatura inativa
        subscriptionInfo: type === 'promoter' ? {
          create: {
            plan: 'none',
            status: 'inactive',
            startDate: new Date(),
            isPermanent: false
          }
        } : undefined
      },
      include: {
        subscriptionInfo: true
      }
    });

    // Remove a senha do objeto retornado
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ 
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
