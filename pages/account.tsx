import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

export default function Account() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    // Carregar configurações de 2FA do usuário
    setTwoFactorEnabled(user.twoFactorEnabled || false);
  }, [user, router]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem');
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
        alert('Senha alterada com sucesso');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await response.json();
        alert(data.message || 'Erro ao alterar senha');
      }
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      alert('Erro ao alterar senha');
    }
  };

  const toggleTwoFactor = async () => {
    try {
      const response = await fetch('/api/user/two-factor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enabled: !twoFactorEnabled,
        }),
      });

      if (response.ok) {
        setTwoFactorEnabled(!twoFactorEnabled);
        alert(twoFactorEnabled ? 'Verificação em duas etapas desativada' : 'Verificação em duas etapas ativada');
      }
    } catch (error) {
      console.error('Erro ao alterar configuração 2FA:', error);
      alert('Erro ao alterar configuração de verificação em duas etapas');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-800/50 rounded-xl p-8 border border-white/5">
            <h1 className="text-3xl font-bold text-white mb-8">Configurações da Conta</h1>

            {/* Alterar Senha */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Alterar Senha</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg hover:from-accent-purple/90 hover:to-accent-pink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
                >
                  Alterar Senha
                </button>
              </form>
            </div>

            {/* Verificação em Duas Etapas */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Verificação em Duas Etapas</h2>
              <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg border border-white/10">
                <div>
                  <p className="text-white font-medium">Status: {twoFactorEnabled ? 'Ativada' : 'Desativada'}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    A verificação em duas etapas adiciona uma camada extra de segurança à sua conta
                  </p>
                </div>
                <button
                  onClick={toggleTwoFactor}
                  className="px-6 py-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg hover:from-accent-purple/90 hover:to-accent-pink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
                >
                  {twoFactorEnabled ? 'Desativar' : 'Ativar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
