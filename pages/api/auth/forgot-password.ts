import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';
import { sendPasswordResetEmail } from '../../../src/lib/mail';
import crypto from 'crypto';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email é obrigatório' });
    }

    // Encontra o usuário
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Por segurança, não informamos se o email existe ou não
      return res.status(200).json({
        message: 'Se o email estiver cadastrado, você receberá as instruções de recuperação'
      });
    }

    // Gera token de recuperação
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

    // Salva o token no banco
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Envia o email
    await sendPasswordResetEmail(email, resetToken);

    res.status(200).json({
      message: 'Se o email estiver cadastrado, você receberá as instruções de recuperação'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      message: 'Erro ao processar a recuperação de senha'
    });
  }
}
