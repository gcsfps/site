import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

interface Subscription {
  plan: string;
  status: string;
  startDate: string;
  endDate: string;
  maxEvents: number;
  maxPresencasPerEvent: number;
  maxFlyersPerMonth: number;
  analytics: boolean;
  prioritySupport: boolean;
  customBranding: boolean;
  profileAccess: boolean;
}

export default function Subscription() {
  const router = useRouter();
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    fetchSubscription();
  }, [user, router]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription/get');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Erro ao buscar assinatura:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-purple"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Minha Assinatura</h1>

        {subscription ? (
          <div className="bg-dark-800/50 rounded-xl p-6 border border-white/5">
            {/* Cabeçalho */}
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-1 rounded-full bg-accent-purple/20 text-accent-purple mb-4">
                Plano {subscription.plan}
              </div>
              <h2 className="text-2xl font-bold text-white">
                Status: <span className={`${subscription.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                  {subscription.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </h2>
              <p className="text-gray-400 mt-2">
                Válido de {formatDate(subscription.startDate)} até {formatDate(subscription.endDate)}
              </p>
            </div>

            {/* Recursos do Plano */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subscription.plan === 'Ultimate' ? (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white mb-4">Benefícios Ultimate</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Eventos Ilimitados
                      </div>
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Presenças Ilimitadas por Evento
                      </div>
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Analytics Avançado
                      </div>
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Suporte Prioritário
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white mb-4">Recursos Exclusivos</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Branding Personalizado
                      </div>
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Acesso a Todas as Funcionalidades
                      </div>
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Relatórios Detalhados
                      </div>
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Perfil Destacado
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white mb-4">Seu Plano Atual</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {subscription.maxEvents === -1 ? 'Eventos Ilimitados' : `${subscription.maxEvents} Eventos`}
                      </div>
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {subscription.maxPresencasPerEvent === -1 ? 'Presenças Ilimitadas' : `${subscription.maxPresencasPerEvent} Presenças por Evento`}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white mb-4">Faça Upgrade para Ultimate</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-400">
                        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Analytics Avançado
                      </div>
                      <div className="flex items-center text-gray-400">
                        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Suporte Prioritário
                      </div>
                      <div className="flex items-center text-gray-400">
                        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Branding Personalizado
                      </div>
                    </div>
                    <button
                      onClick={() => router.push('/plans')}
                      className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg hover:from-accent-purple/90 hover:to-accent-pink/90"
                    >
                      Fazer Upgrade
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Botão de Upgrade */}
            {subscription.plan !== 'Ultimate' && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/plans')}
                  className="px-6 py-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg hover:from-accent-purple/90 hover:to-accent-pink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
                >
                  Fazer Upgrade
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-dark-800/50 rounded-xl p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-4">Escolha um Plano</h2>
              <p className="text-gray-400 mb-8">
                Você ainda não tem uma assinatura ativa. Escolha um plano para começar a criar eventos incríveis!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Plano Basic */}
                <div className="bg-dark-700/50 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-2">Basic</h3>
                  <p className="text-accent-purple font-medium mb-4">R$ 49,90/mês</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-white">
                      <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      5 Eventos por mês
                    </li>
                    <li className="flex items-center text-white">
                      <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      100 Presenças por evento
                    </li>
                  </ul>
                  <button
                    onClick={() => router.push('/plans?plan=basic')}
                    className="w-full px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg hover:from-accent-purple/90 hover:to-accent-pink/90"
                  >
                    Escolher Basic
                  </button>
                </div>

                {/* Plano Ultimate */}
                <div className="bg-dark-700/50 rounded-xl p-6 border border-accent-purple/20">
                  <div className="absolute top-0 right-0 bg-accent-purple text-white text-xs px-2 py-1 rounded-bl">
                    Recomendado
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Ultimate</h3>
                  <p className="text-accent-purple font-medium mb-4">R$ 99,90/mês</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-white">
                      <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Eventos Ilimitados
                    </li>
                    <li className="flex items-center text-white">
                      <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Presenças Ilimitadas
                    </li>
                    <li className="flex items-center text-white">
                      <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Analytics Avançado
                    </li>
                    <li className="flex items-center text-white">
                      <svg className="w-5 h-5 text-accent-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Suporte Prioritário
                    </li>
                  </ul>
                  <button
                    onClick={() => router.push('/plans?plan=ultimate')}
                    className="w-full px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg hover:from-accent-purple/90 hover:to-accent-pink/90"
                  >
                    Escolher Ultimate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
