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

    // Validar o tipo de usuário
    if (!['promoter', 'vip'].includes(type)) {
      return res.status(400).json({ message: 'Tipo de usuário inválido' });
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

    // Cria o usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        type,
        whatsapp: type === 'vip' ? whatsapp : null,
        establishmentName: type === 'promoter' ? establishmentName : null,
        address: type === 'promoter' ? address : null,
        phone: type === 'promoter' ? phone : null,
        description: type === 'promoter' ? description : null,
        // Promoters começam sem assinatura
        subscription: type === 'promoter' ? {
          create: {
            status: 'inactive',
            type: 'none'
          }
        } : undefined
      },
      include: {
        subscription: true
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
