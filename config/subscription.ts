// Configurações de assinatura
export const subscriptionConfig = {
  // Se true, novos promoters recebem 1 mês grátis do plano Basic
  enableFreeTrial: true,
  
  // Duração do período grátis em dias
  freeTrialDays: 30,
  
  // Plano oferecido no período grátis
  freeTrialPlan: 'Basic' as const,
} as const;

// Tipos de plano disponíveis
export type SubscriptionPlan = 'Ultimate' | 'Premium' | 'Basic';

// Status de assinatura
export type SubscriptionStatus = 'active' | 'inactive';
