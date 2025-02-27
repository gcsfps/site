import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { IUser } from '../../src/types';
import Link from 'next/link';
import PlanIcon from '../../components/PlanIcon'; // Import the PlanIcon component

interface Subscription {
  plan: 'Ultimate' | 'Premium' | 'Basic';
  status: 'active' | 'inactive';
  endDate?: string;
  isPermanent?: boolean;
}

export default function Account() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/profile/${session.user.id}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error('Erro ao buscar dados do usuário');
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  useEffect(() => {
    if (session?.user?.email === 'gabrielcordeiromail@gmail.com') {
      setSubscription({
        plan: 'Ultimate',
        status: 'active'
      });
    } else if (userData?.subscription) {
      setSubscription(userData.subscription);
    }
  }, [session, userData]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    const form = e.target as HTMLFormElement;
    const currentPassword = (form.elements.namedItem('currentPassword') as HTMLInputElement).value;
    const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas não coincidem' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
        form.reset();
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao alterar senha' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao alterar senha' });
    }

    setIsLoading(false);
  };

  if (status === 'loading' || !userData) {
    return (
      <Layout>
        <div className="min-h-screen bg-dark-900 py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="glass-card p-8">
              <div className="text-center">Carregando...</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-card p-8">
            <h1 className="text-3xl font-bold mb-8">
              <span className="gradient-text">Minha Conta</span>
            </h1>

            <div className="space-y-8">
              {/* Informações da Conta */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Informações da Conta</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-1">Email</label>
                    <div className="text-gray-200">{userData.email}</div>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Tipo de Conta</label>
                    <div className="text-gray-200 capitalize">
                      {userData.type === 'organizer' ? 'Promoter' : 'Presença'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Alterar Senha */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-gray-400 mb-1">
                      Senha Atual
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-dark-800 text-white border border-gray-700 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple"
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-gray-400 mb-1">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-dark-800 text-white border border-gray-700 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-400 mb-1">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-dark-800 text-white border border-gray-700 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple"
                    />
                  </div>

                  {message.text && (
                    <div
                      className={`p-4 rounded-lg ${
                        message.type === 'error' ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full"
                  >
                    {isLoading ? 'Alterando...' : 'Alterar Senha'}
                  </button>
                </form>
              </div>

              {/* Assinatura (apenas para Promoters) */}
              {userData.type === 'organizer' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Assinatura</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Plano</p>
                      <div className="flex items-center space-x-2">
                        {subscription ? (
                          <>
                            <PlanIcon plan={subscription.plan} size="md" />
                            <span className="text-white font-medium">{subscription.plan}</span>
                          </>
                        ) : (
                          <span className="text-gray-300">Sem plano</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Status</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        subscription?.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {subscription?.status === 'active' ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>
                    {!subscription?.isPermanent && subscription?.endDate && (
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Validade</p>
                        <div className="text-gray-200">
                          {new Date(subscription.endDate).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    )}
                    <div>
                      <Link
                        href="/subscription/plans"
                        className="btn-secondary inline-block"
                      >
                        Ver Benefícios do Plano
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
