import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

interface UserProfile {
  name: string;
  email: string;
  subscription?: {
    plan: string;
    status: string;
    startDate: string;
    endDate: string;
  };
}

export default function Account() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchProfile();
  }, [user, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas não coincidem' });
      return;
    }

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Senha atualizada com sucesso!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.message || 'Erro ao atualizar senha' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao atualizar senha' });
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
        <h1 className="text-3xl font-bold text-white mb-8">Minha Conta</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Informações do Perfil */}
          <div className="bg-dark-800/50 rounded-xl p-6 border border-white/5">
            <h2 className="text-xl font-semibold text-white mb-6">Informações do Perfil</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nome</label>
                <p className="text-white">{profile?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <p className="text-white">{profile?.email}</p>
              </div>
              {profile?.subscription && (
                <div className="mt-6 pt-6 border-t border-white/5">
                  <h3 className="text-lg font-medium text-white mb-4">Assinatura</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Plano</label>
                      <p className="text-accent-purple font-medium">{profile.subscription.plan}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                      <p className="text-white">{profile.subscription.status}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Validade</label>
                      <p className="text-white">
                        {formatDate(profile.subscription.startDate)} até {formatDate(profile.subscription.endDate)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Alterar Senha */}
          <div className="bg-dark-800/50 rounded-xl p-6 border border-white/5">
            <h2 className="text-xl font-semibold text-white mb-6">Alterar Senha</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-white mb-2">
                  Senha Atual
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-accent-purple focus:border-accent-purple"
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-white mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-accent-purple focus:border-accent-purple"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-accent-purple focus:border-accent-purple"
                  required
                />
              </div>

              {message.text && (
                <div
                  className={`p-3 rounded-lg ${
                    message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg hover:from-accent-purple/90 hover:to-accent-pink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
              >
                Alterar Senha
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
