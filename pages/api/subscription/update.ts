import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { plan } = req.body;

    if (!plan) {
      return res.status(400).json({ message: 'Plan is required' });
    }

    const planDetails = {
      Basic: {
        maxEvents: 3,
        maxPresencasPerEvent: 10,
        maxFlyersPerMonth: 4,
        analytics: false,
        prioritySupport: false,
        customBranding: false,
        profileAccess: true,
      },
      Premium: {
        maxEvents: 5,
        maxPresencasPerEvent: 20,
        maxFlyersPerMonth: -1, // ilimitado
        analytics: true,
        prioritySupport: true,
        customBranding: false,
        profileAccess: true,
      },
      Ultimate: {
        maxEvents: -1, // ilimitado
        maxPresencasPerEvent: -1, // ilimitado
        maxFlyersPerMonth: -1, // ilimitado
        analytics: true,
        prioritySupport: true,
        customBranding: true,
        profileAccess: true,
      },
    };

    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const subscription = await prisma.subscription.upsert({
      where: {
        userId: user.id,
      },
      update: {
        plan,
        status: 'active',
        startDate,
        endDate,
        ...planDetails[plan as keyof typeof planDetails],
      },
      create: {
        userId: user.id,
        plan,
        status: 'active',
        startDate,
        endDate,
        ...planDetails[plan as keyof typeof planDetails],
      },
    });

    return res.status(200).json({ subscription });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
