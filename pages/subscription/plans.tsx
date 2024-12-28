import { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

const plans = [
  {
    name: 'Basic',
    price: 99.90,
    features: {
      maxEvents: 3,
      maxPresencasPerEvent: 10,
      maxFlyersPerMonth: 4,
      analytics: false,
      prioritySupport: false,
      customBranding: false,
      profileAccess: true,
    },
    description: [
      'Até 3 eventos simultâneos',
      'Máximo 10 presenças por evento',
      '4 flyers por mês',
      'Acesso aos perfis completos',
      'Suporte por email',
    ],
  },
  {
    name: 'Premium',
    price: 199.90,
    features: {
      maxEvents: 5,
      maxPresencasPerEvent: 20,
      maxFlyersPerMonth: -1, // Ilimitado
      analytics: true,
      prioritySupport: true,
      customBranding: false,
      profileAccess: true,
    },
    description: [
      'Até 5 eventos simultâneos',
      'Máximo 20 presenças por evento',
      'Flyers ilimitados',
      'Analytics e relatórios',
      'Suporte prioritário',
      'Acesso aos perfis completos',
    ],
  },
  {
    name: 'Ultimate',
    price: 399.90,
    features: {
      maxEvents: -1, // Ilimitado
      maxPresencasPerEvent: -1, // Ilimitado
      maxFlyersPerMonth: -1, // Ilimitado
      analytics: true,
      prioritySupport: true,
      customBranding: true,
      profileAccess: true,
    },
    description: [
      'Eventos ilimitados',
      'Presenças ilimitadas por evento',
      'Flyers ilimitados',
      'Analytics avançado',
      'Suporte VIP 24/7',
      'Personalização de marca',
      'Acesso aos perfis completos',
      'Recursos exclusivos',
    ],
  },
];

// Contas de teste para cada plano
const testAccounts = [
  {
    plan: 'Basic',
    email: 'basic@test.com',
    password: 'basic123',
  },
  {
    plan: 'Premium',
    email: 'premium@test.com',
    password: 'premium123',
  },
  {
    plan: 'Ultimate',
    email: 'ultimate@test.com',
    password: 'ultimate123',
  },
];

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName);
    // Em produção, aqui redirecionaria para o checkout
    const account = testAccounts.find(acc => acc.plan === planName);
    alert(`Conta de teste para o plano ${planName}:
Email: ${account?.email}
Senha: ${account?.password}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Status da Assinatura Atual */}
          {user?.subscription && (
            <div className="mb-12 p-6 glass-card rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                <span className="gradient-text">Sua Assinatura</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-gray-400 mb-2">Plano Atual</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`
                      px-3 py-1 rounded-full text-sm font-medium text-white
                      bg-gradient-to-r ${
                        user.subscription.plan === 'Ultimate'
                          ? 'from-purple-600 to-pink-600'
                          : user.subscription.plan === 'Premium'
                          ? 'from-blue-600 to-cyan-600'
                          : 'from-gray-600 to-gray-400'
                      }
                    `}>
                      {user.subscription.plan}
                    </span>
                    {user.subscription.isPermanent && (
                      <span className="text-green-400 text-sm">Permanente</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-400 mb-2">Status</h3>
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${user.subscription.status === 'active'
                      ? 'bg-green-900/50 text-green-400'
                      : 'bg-red-900/50 text-red-400'
                    }
                  `}>
                    {user.subscription.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                {!user.subscription.isPermanent && user.subscription.endDate && (
                  <div>
                    <h3 className="text-gray-400 mb-2">Validade</h3>
                    <p className="text-white">
                      Até {formatDate(user.subscription.endDate)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Lista de Planos */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">
                {user?.subscription?.status === 'active'
                  ? 'Benefícios do Seu Plano'
                  : 'Planos para Promoters'}
              </span>
            </h1>
            {user?.subscription?.status === 'active' ? (
              <p className="text-gray-400 text-lg">
                Você está no plano {user.subscription.plan}
                {user.subscription.isPermanent ? ' com acesso permanente' : ''}
              </p>
            ) : (
              <p className="text-gray-400 text-lg">
                Escolha o plano ideal para o seu negócio
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`
                  glass-card p-6 rounded-lg
                  ${user?.subscription?.plan === plan.name ? 'ring-2 ring-accent-purple' : ''}
                `}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <p className="text-3xl font-bold mb-4">
                    R$ {plan.price.toFixed(2)}
                    <span className="text-sm font-normal text-gray-400">/mês</span>
                  </p>
                  {user?.subscription?.status === 'active' ? (
                    user?.subscription?.plan === plan.name ? (
                      <span className="inline-block px-4 py-2 rounded-full bg-accent-purple/20 text-accent-purple">
                        Seu plano atual
                      </span>
                    ) : null
                  ) : (
                    <button
                      onClick={() => handleSubscribe(plan.name)}
                      className="btn-primary w-full"
                    >
                      Assinar
                    </button>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.description.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <svg
                        className="h-5 w-5 text-accent-purple mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-gray-400">
            <p>
              Já tem uma assinatura?{' '}
              <button
                onClick={() => router.push('/events/manage')}
                className="text-accent-purple hover:text-accent-pink"
              >
                Gerenciar Eventos
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
