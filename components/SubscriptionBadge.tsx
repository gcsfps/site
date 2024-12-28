import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function SubscriptionBadge() {
  const { user } = useAuth();

  if (!user?.subscription) return null;

  const getBadgeColor = (plan: string) => {
    switch (plan) {
      case 'Ultimate':
        return 'from-purple-600 to-pink-600';
      case 'Premium':
        return 'from-blue-600 to-cyan-600';
      default:
        return 'from-gray-600 to-gray-400';
    }
  };

  const getRemainingTime = () => {
    if (user.subscription.isPermanent) {
      return 'Permanente';
    }

    if (!user.subscription.endDate) {
      return 'Sem data de término';
    }

    const end = new Date(user.subscription.endDate);
    const now = new Date();
    const diffTime = Math.abs(end.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} dias restantes`;
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`
        px-3 py-1 rounded-full text-sm font-medium text-white
        bg-gradient-to-r ${getBadgeColor(user.subscription.plan)}
        shadow-lg hover:shadow-xl transition-shadow
        border border-white/10
      `}>
        {user.subscription.plan}
      </div>
      <span className="text-sm text-gray-400">
        {getRemainingTime()}
      </span>
    </div>
  );
}
