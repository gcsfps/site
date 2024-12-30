import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useUserPermissions } from '../src/hooks/useUserPermissions';

interface AnalyticsData {
  totalEvents: number;
  totalPresences: number;
  averagePresencesPerEvent: number;
  eventsByMonth: {
    month: string;
    count: number;
  }[];
  presencesByMonth: {
    month: string;
    count: number;
  }[];
}

export default function Analytics() {
  const router = useRouter();
  const { user } = useAuth();
  const { isPromoter } = useUserPermissions();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!isPromoter) {
      router.push('/dashboard');
      return;
    }

    fetchAnalytics();
  }, [user, isPromoter, router]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/promoter/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Erro ao buscar analytics:', error);
    } finally {
      setLoading(false);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Analytics</h1>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-dark-800/50 rounded-xl p-6 border border-white/5">
            <h3 className="text-gray-400 text-sm mb-2">Total de Eventos</h3>
            <p className="text-2xl font-bold text-white">{analytics?.totalEvents || 0}</p>
          </div>
          <div className="bg-dark-800/50 rounded-xl p-6 border border-white/5">
            <h3 className="text-gray-400 text-sm mb-2">Total de Presenças</h3>
            <p className="text-2xl font-bold text-white">{analytics?.totalPresences || 0}</p>
          </div>
          <div className="bg-dark-800/50 rounded-xl p-6 border border-white/5">
            <h3 className="text-gray-400 text-sm mb-2">Média de Presenças/Evento</h3>
            <p className="text-2xl font-bold text-white">
              {analytics?.averagePresencesPerEvent?.toFixed(1) || '0.0'}
            </p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Eventos por Mês */}
          <div className="bg-dark-800/50 rounded-xl p-6 border border-white/5">
            <h3 className="text-white text-lg font-medium mb-4">Eventos por Mês</h3>
            <div className="h-64">
              {/* Aqui você pode adicionar um componente de gráfico como Recharts ou Chart.js */}
              <div className="flex flex-col space-y-2">
                {analytics?.eventsByMonth?.map((item) => (
                  <div key={item.month} className="flex items-center space-x-2">
                    <span className="text-gray-400 w-24">{item.month}</span>
                    <div className="flex-1 bg-dark-700 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-accent-purple to-accent-pink h-full rounded-full"
                        style={{
                          width: `${(item.count / Math.max(...analytics.eventsByMonth.map(x => x.count))) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-white w-12 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Presenças por Mês */}
          <div className="bg-dark-800/50 rounded-xl p-6 border border-white/5">
            <h3 className="text-white text-lg font-medium mb-4">Presenças por Mês</h3>
            <div className="h-64">
              <div className="flex flex-col space-y-2">
                {analytics?.presencesByMonth?.map((item) => (
                  <div key={item.month} className="flex items-center space-x-2">
                    <span className="text-gray-400 w-24">{item.month}</span>
                    <div className="flex-1 bg-dark-700 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-accent-purple to-accent-pink h-full rounded-full"
                        style={{
                          width: `${(item.count / Math.max(...analytics.presencesByMonth.map(x => x.count))) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-white w-12 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
