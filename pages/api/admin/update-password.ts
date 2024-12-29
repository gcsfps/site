import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email e nova senha são obrigatórios' });
    }

    // Atualiza a senha do usuário
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: newPassword },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Senha atualizada com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro ao atualizar senha' 
    });
  }
}
