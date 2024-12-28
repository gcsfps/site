import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { IUser } from '../../../src/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      console.error('Sessão inválida:', session);
      return res.status(401).json({ 
        success: false,
        message: 'Não autorizado' 
      });
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

    // Log dos dados recebidos
    console.log('Dados recebidos:', JSON.stringify({
      name,
      establishmentName,
      address,
      phone,
      description,
      profileImage: profileImage ? 'presente' : 'ausente',
      coverImage: coverImage ? 'presente' : 'ausente',
      openingHours,
      socialMedia,
    }, null, 2));

    // Validação básica
    if (!name || !establishmentName) {
      return res.status(400).json({ 
        success: false,
        message: 'Nome e nome do estabelecimento são obrigatórios' 
      });
    }

    // Log dos dados que serão enviados ao banco
    console.log('Dados para atualização:', JSON.stringify({
      name,
      establishmentName,
      phone: phone || '',
      description: description || '',
      profileImage: profileImage || null,
      coverImage: coverImage || null,
      address: typeof address === 'object' ? address : {},
      openingHours: typeof openingHours === 'object' ? openingHours : {},
      socialMedia: typeof socialMedia === 'object' ? socialMedia : {},
    }, null, 2));

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: name,
        establishmentName: establishmentName,
        phone: phone || null,
        description: description || null,
        profileImage: profileImage || null,
        coverImage: coverImage || null,
        address: address || {},
        openingHours: openingHours || {},
        socialMedia: socialMedia || {},
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

    // Log do usuário atualizado
    console.log('Usuário atualizado:', JSON.stringify(updatedUser, null, 2));

    // Retorna os dados atualizados
    return res.status(200).json({
      success: true,
      user: updatedUser
    });
  } catch (error: any) {
    // Log detalhado do erro
    console.error('Erro detalhado:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
    });

    return res.status(500).json({ 
      success: false,
      message: 'Erro ao atualizar perfil',
      error: error.message,
      code: error.code
    });
  }
}
