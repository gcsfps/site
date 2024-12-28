import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PlanIcon from './PlanIcon';

export default function SubscriptionBadge() {
  const { user } = useAuth();

  if (!user?.subscription || user.subscription.status !== 'active') return null;

  return (
    <div className="flex items-center space-x-2">
      <PlanIcon plan={user.subscription.plan} size="sm" />
      <div className="text-sm">
        <span className="text-gray-300">{user.email}</span>
        {user.subscription.isPermanent && (
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-900/50 text-green-400">
            Permanente
          </span>
        )}
      </div>
    </div>
  );
}
