import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

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

    if (!user.subscription) {
      return res.status(200).json({ subscription: null });
    }

    const subscription = {
      plan: user.subscription.plan,
      status: user.subscription.status,
      startDate: user.subscription.startDate,
      endDate: user.subscription.endDate,
      maxEvents: user.subscription.maxEvents,
      maxPresencasPerEvent: user.subscription.maxPresencasPerEvent,
      maxFlyersPerMonth: user.subscription.maxFlyersPerMonth,
      analytics: user.subscription.analytics,
      prioritySupport: user.subscription.prioritySupport,
      customBranding: user.subscription.customBranding,
      profileAccess: user.subscription.profileAccess,
    };

    return res.status(200).json({ subscription });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
