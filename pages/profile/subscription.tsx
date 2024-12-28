import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import PlanIcon from '../../components/PlanIcon';

interface Subscription {
  id: string;
  plan: 'Basic' | 'Premium' | 'Ultimate';
  status: 'active' | 'canceled' | 'expired';
  startDate: string;
  endDate: string;
  features: string[];
  price: number;
}

const PLAN_FEATURES = {
  Basic: [
    'Acesso a eventos básicos',
    'Perfil personalizado',
    'Suporte por email'
  ],
  Premium: [
    'Todos os benefícios do Basic',
    'Eventos premium exclusivos',
    'Prioridade na lista de espera',
    'Suporte prioritário'
  ],
  Ultimate: [
    'Todos os benefícios do Premium',
    'Eventos VIP exclusivos',
    'Acesso antecipado a eventos',
    'Suporte VIP 24/7',
    'Encontros exclusivos'
  ]
};

export default function Subscription() {
  const { data: session } = useSession();
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchSubscription = async () => {
      try {
        const response = await fetch('/api/subscription');
        const data = await response.json();
        setSubscription(data.subscription);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [session, router]);

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Minha Assinatura</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-pink mx-auto"></div>
          </div>
        ) : subscription ? (
          <div className="bg-dark-800/50 rounded-2xl border border-white/5 overflow-hidden">
            {/* Header da Assinatura */}
            <div className="p-8 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <PlanIcon plan={subscription.plan} size="lg" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Plano {subscription.plan}</h2>
                    <p className="text-gray-400 mt-1">
                      R$ {subscription.price.toFixed(2)}/mês
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                  ${subscription.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    subscription.status === 'canceled' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                  }`}>
                  {subscription.status === 'active' ? 'Ativo' :
                    subscription.status === 'canceled' ? 'Cancelado' : 'Expirado'}
                </span>
              </div>

              {/* Período da Assinatura */}
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Início da Assinatura</p>
                  <p className="mt-1 text-white">
                    {new Date(subscription.startDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Término da Assinatura</p>
                  <p className="mt-1 text-white">
                    {new Date(subscription.endDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              {/* Dias Restantes */}
              {subscription.status === 'active' && (
                <div className="mt-6">
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Dias Restantes</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {getDaysRemaining(subscription.endDate)} dias
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Features do Plano */}
            <div className="p-8">
              <h3 className="text-lg font-semibold text-white mb-4">Benefícios do seu Plano</h3>
              <ul className="space-y-3">
                {PLAN_FEATURES[subscription.plan].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <svg className="h-5 w-5 text-accent-pink mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Botões de Ação */}
            <div className="p-8 bg-dark-900/30 border-t border-white/5">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => router.push('/plans')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-purple hover:bg-accent-purple/90 transition-colors duration-200"
                >
                  Alterar Plano
                </button>
                {subscription.status === 'active' && (
                  <button
                    onClick={() => {/* Adicionar lógica de cancelamento */}}
                    className="inline-flex items-center px-6 py-3 border border-white/10 text-base font-medium rounded-md text-white hover:bg-white/5 transition-colors duration-200"
                  >
                    Cancelar Assinatura
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-dark-800/50 rounded-2xl border border-white/5">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-white">Nenhuma assinatura ativa</h3>
            <p className="mt-2 text-gray-400">Escolha um plano para começar a aproveitar todos os benefícios!</p>
            <button
              onClick={() => router.push('/plans')}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-purple hover:bg-accent-purple/90 transition-colors duration-200"
            >
              Ver Planos Disponíveis
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
