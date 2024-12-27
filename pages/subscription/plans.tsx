import { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

const plans = [
  {
    name: 'Basic',
    price: 99.90,
    features: {
      maxEvents: 5,
      maxPresencasPerEvent: 50,
      analytics: false,
      prioritySupport: false,
      customBranding: false,
      profileAccess: true,
    },
    description: [
      'Até 5 eventos simultâneos',
      'Máximo 50 presenças por evento',
      'Acesso aos perfis completos',
      'Suporte por email',
    ],
  },
  {
    name: 'Premium',
    price: 199.90,
    features: {
      maxEvents: 15,
      maxPresencasPerEvent: 150,
      analytics: true,
      prioritySupport: true,
      customBranding: false,
      profileAccess: true,
    },
    description: [
      'Até 15 eventos simultâneos',
      'Máximo 150 presenças por evento',
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
      analytics: true,
      prioritySupport: true,
      customBranding: true,
      profileAccess: true,
    },
    description: [
      'Eventos ilimitados',
      'Presenças ilimitadas por evento',
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

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName);
    // Em produção, aqui redirecionaria para o checkout
    alert(\`Conta de teste para o plano \${planName}:
Email: \${testAccounts.find(acc => acc.plan === planName)?.email}
Senha: \${testAccounts.find(acc => acc.plan === planName)?.password}\`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Planos para Promoters</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Escolha o plano ideal para o seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`glass-card p-6 ${
                  plan.name === 'Premium' ? 'border-2 border-accent-purple' : ''
                }`}
              >
                {plan.name === 'Premium' && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-accent-purple text-white px-4 py-1 rounded-full text-sm">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <p className="text-4xl font-bold mb-2">
                    R$ {plan.price.toFixed(2)}
                    <span className="text-sm text-gray-400">/mês</span>
                  </p>
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

                <button
                  onClick={() => handleSubscribe(plan.name)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.name === 'Premium'
                      ? 'bg-accent-purple hover:bg-accent-pink text-white'
                      : 'bg-dark-800 hover:bg-dark-700 text-gray-300'
                  }`}
                >
                  Assinar Plano
                </button>
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
