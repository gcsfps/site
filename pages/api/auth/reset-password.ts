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
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: 'Token e nova senha são obrigatórios'
      });
    }

    // Encontra o usuário com o token válido
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        message: 'Token inválido ou expirado'
      });
    }

    // Atualiza a senha e limpa o token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.status(200).json({
      message: 'Senha atualizada com sucesso'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      message: 'Erro ao redefinir a senha'
    });
  }
}
