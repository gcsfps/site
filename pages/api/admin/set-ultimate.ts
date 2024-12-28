import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// Lista de emails de administradores
const ADMIN_EMAILS = ['gabrielcordeiromail@gmail.com'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    // Atualiza a assinatura para Ultimate permanente
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        type: 'organizer',
        subscription: {
          plan: 'Ultimate',
          status: 'active',
          isAdmin: true,
          isPermanent: true,
          features: {
            maxEvents: -1,
            maxPresencasPerEvent: -1,
            maxFlyersPerMonth: -1,
            analytics: true,
            prioritySupport: true,
            customBranding: true,
            profileAccess: true,
          },
          startDate: new Date().toISOString(),
          // Não definimos endDate para indicar que é permanente
        },
      },
    });

    return res.status(200).json({ message: 'Conta atualizada para Ultimate permanente' });
  } catch (error) {
    console.error('Erro ao atualizar assinatura:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
