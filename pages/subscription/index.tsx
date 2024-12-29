"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import PlanIcon from '../../components/PlanIcon';

const plans = [
  {
    name: 'Basic',
    price: 99.90,
    features: [
      '3 eventos simultâneos',
      '10 presenças por evento',
      '4 flyers por mês',
      'Suporte por email',
      'Acesso aos perfis'
    ]
  },
  {
    name: 'Premium',
    price: 199.90,
    features: [
      '5 eventos simultâneos',
      '20 presenças por evento',
      'Flyers ilimitados',
      'Analytics e relatórios',
      'Suporte prioritário',
      'Acesso aos perfis'
    ]
  },
  {
    name: 'Ultimate',
    price: 399.90,
    features: [
      'Eventos ilimitados',
      'Presenças ilimitadas',
      'Todos os recursos premium',
      'Personalização de marca',
      'Recursos exclusivos',
      'Suporte VIP 24/7'
    ]
  }
];

export default function Subscription() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    // Buscar informações do usuário
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);

          // Se não for promoter, redireciona
          if (userData.type !== 'promoter') {
            router.push('/events');
            return;
          }

          // Se já tiver assinatura ativa, redireciona para o perfil
          if (userData.subscription?.status === 'active') {
            router.push('/profile');
            return;
          }
        }
      } catch (error) {
        setError('Erro ao carregar informações do usuário');
      }
    };

    fetchUserInfo();
  }, [session, router]);

  const handleSelectPlan = async (planName: string) => {
    setSelectedPlan(planName);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/subscription/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
        }),
      });

      if (response.ok) {
        router.push('/subscription/success');
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao criar assinatura');
      }
    } catch (error) {
      setError('Erro ao processar assinatura');
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Escolha seu Plano</span>
            </h1>
            <p className="text-xl text-gray-400">
              Selecione o plano ideal para o seu negócio
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`glass-card p-8 relative overflow-hidden transition-all duration-300 ${
                  selectedPlan === plan.name
                    ? 'border-2 border-accent-purple'
                    : 'border border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <PlanIcon plan={plan.name as 'Ultimate' | 'Premium' | 'Basic'} size="lg" />
                    <h2 className="text-2xl font-bold">{plan.name}</h2>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-4xl font-bold mb-2">
                    R$ {plan.price.toFixed(2)}
                    <span className="text-sm font-normal text-gray-400">/mês</span>
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 text-accent-purple mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full py-3 px-4 rounded-lg transition-all duration-300 ${
                    selectedPlan === plan.name
                      ? 'bg-accent-purple text-white'
                      : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                  }`}
                  disabled={loading}
                >
                  {selectedPlan === plan.name ? 'Plano Selecionado' : 'Selecionar Plano'}
                </button>
              </div>
            ))}
          </div>

          {selectedPlan && (
            <div className="text-center">
              <button
                onClick={handleSubscribe}
                className="btn-primary px-8 py-3"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Processando...
                  </div>
                ) : (
                  'Confirmar Assinatura'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
