import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';
import { hash } from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    // Hash da senha
    const hashedPassword = await hash(password, 12);

    // Atualiza a senha do usuário com o hash
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
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
