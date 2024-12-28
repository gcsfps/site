import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        establishmentName: true,
        phone: true,
        description: true,
        profileImage: true,
        coverImage: true,
        address: true,
        openingHours: true,
        socialMedia: true,
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Se o usuário não estiver logado ou não for o dono do perfil,
    // remove informações sensíveis
    if (!session?.user || session.user.id !== id) {
      delete user.email;
      delete user.phone;
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
