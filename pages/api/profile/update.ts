import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const {
      name,
      establishmentName,
      address,
      phone,
      description,
      profileImage,
      coverImage,
      openingHours,
      socialMedia,
    } = req.body;

    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name,
        establishmentName,
        address: {
          cep: address.cep,
          street: address.street,
          number: address.number,
          complement: address.complement,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
        },
        phone,
        description,
        profileImage,
        coverImage,
        openingHours,
        socialMedia,
      },
    });

    // Remover a senha do objeto retornado
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: 'Perfil atualizado com sucesso',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
}
