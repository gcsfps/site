import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

interface Settings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  theme: 'dark' | 'light';
  language: 'pt' | 'en';
}

export default function Settings() {
  const router = useRouter();
  const { user } = useAuth();
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    pushNotifications: true,
    theme: 'dark',
    language: 'pt'
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    fetchSettings();
  }, [user, router]);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (setting: keyof Settings) => {
    if (typeof settings[setting] === 'boolean') {
      setSettings(prev => ({
        ...prev,
        [setting]: !prev[setting]
      }));
    }
  };

  const handleSelectChange = (setting: keyof Settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings }),
      });

      if (response.ok) {
        // Mostrar mensagem de sucesso
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    } finally {
      setIsSaving(false);
    }
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
        <h1 className="text-3xl font-bold text-white mb-8">Configurações</h1>

        <div className="bg-dark-800/50 rounded-xl p-6 border border-white/5">
          <div className="space-y-6">
            {/* Notificações */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Notificações</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Notificações por Email</p>
                    <p className="text-sm text-gray-400">Receba atualizações sobre seus eventos por email</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('emailNotifications')}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      settings.emailNotifications ? 'bg-accent-purple' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Notificações Push</p>
                    <p className="text-sm text-gray-400">Receba notificações em tempo real</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('pushNotifications')}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      settings.pushNotifications ? 'bg-accent-purple' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings.pushNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Preferências */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Preferências</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-white mb-2">
                    Tema
                  </label>
                  <select
                    id="theme"
                    value={settings.theme}
                    onChange={(e) => handleSelectChange('theme', e.target.value)}
                    className="block w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-accent-purple focus:border-accent-purple"
                  >
                    <option value="dark">Escuro</option>
                    <option value="light">Claro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-white mb-2">
                    Idioma
                  </label>
                  <select
                    id="language"
                    value={settings.language}
                    onChange={(e) => handleSelectChange('language', e.target.value)}
                    className="block w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-accent-purple focus:border-accent-purple"
                  >
                    <option value="pt">Português</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Botão Salvar */}
          <div className="mt-8">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg hover:from-accent-purple/90 hover:to-accent-pink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
