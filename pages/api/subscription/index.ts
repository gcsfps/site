import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session?.user?.email) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Verificar se o email é o do admin
    if (session.user.email === 'gabrielcordeiromail@gmail.com') {
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      const subscription = {
        id: 'ultimate-subscription',
        plan: 'Ultimate',
        status: 'active',
        startDate: new Date().toISOString(),
        endDate: oneYearFromNow.toISOString(),
        features: [
          'Todos os benefícios do Premium',
          'Eventos VIP exclusivos',
          'Acesso antecipado a eventos',
          'Suporte VIP 24/7',
          'Encontros exclusivos'
        ],
        price: 99.90
      };

      return res.status(200).json({ subscription });
    }

    // Se não for o admin, retorna sem assinatura
    return res.status(200).json({ subscription: null });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
