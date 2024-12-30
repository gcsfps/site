import { useSession } from 'next-auth/react';

interface SubscriptionPermissions {
  maxEvents?: number;
  maxApplicationsPerEvent?: number;
  canFeatureEvents?: boolean;
  canUseAnalytics?: boolean;
  canUsePriority?: boolean;
  canUseAdvancedFilters?: boolean;
}

const SUBSCRIPTION_PERMISSIONS: { [key: string]: SubscriptionPermissions } = {
  'Basic': {
    maxEvents: 5,
    maxApplicationsPerEvent: 50,
    canFeatureEvents: false,
    canUseAnalytics: false,
    canUsePriority: false,
    canUseAdvancedFilters: false
  },
  'Premium': {
    maxEvents: 15,
    maxApplicationsPerEvent: 150,
    canFeatureEvents: true,
    canUseAnalytics: true,
    canUsePriority: false,
    canUseAdvancedFilters: true
  },
  'Ultimate': {
    maxEvents: -1, // Ilimitado
    maxApplicationsPerEvent: -1, // Ilimitado
    canFeatureEvents: true,
    canUseAnalytics: true,
    canUsePriority: true,
    canUseAdvancedFilters: true
  }
};

export function useUserPermissions() {
  const { data: session } = useSession();
  const userType = session?.user?.type;
  const subscription = session?.user?.subscription;
  const subscriptionPlan = subscription?.plan || 'Basic';
  const permissions = SUBSCRIPTION_PERMISSIONS[subscriptionPlan];

  const isPromoter = userType === 'promoter';
  const isVip = userType === 'presenca_vip';

  return {
    // Tipos de usuário
    isPromoter,
    isVip,

    // Permissões básicas
    canCreateEvents: isPromoter,
    canManageEvents: isPromoter,
    canApplyToEvents: isVip,
    canViewApplications: isPromoter,
    canViewMyApplications: isVip,
    canManageSubscription: isPromoter,

    // Permissões baseadas no plano (apenas para promoters)
    maxEvents: isPromoter ? permissions?.maxEvents : 0,
    maxApplicationsPerEvent: isPromoter ? permissions?.maxApplicationsPerEvent : 0,
    canFeatureEvents: isPromoter && permissions?.canFeatureEvents,
    canUseAnalytics: isPromoter && permissions?.canUseAnalytics,
    canUsePriority: isPromoter && permissions?.canUsePriority,
    canUseAdvancedFilters: isPromoter && permissions?.canUseAdvancedFilters,

    // Dados do usuário
    user: session?.user,
    subscription,
    subscriptionPlan
  };
}
