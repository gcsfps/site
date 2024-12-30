import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUserPermissions } from '../../src/hooks/useUserPermissions';
import { useToast } from '../../contexts/ToastContext';
import { logger } from '../../src/lib/logger';

interface VipDashboardStats {
  totalApplications: number;
  pendingApplications: number;
  confirmedApplications: number;
  upcomingEvents: Array<{
    id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    status: string;
  }>;
}

export default function VipDashboard() {
  const router = useRouter();
  const { isVip } = useUserPermissions();
  const { addToast } = useToast();
  const [stats, setStats] = useState<VipDashboardStats>({
    totalApplications: 0,
    pendingApplications: 0,
    confirmedApplications: 0,
    upcomingEvents: [],
  });

  useEffect(() => {
    if (!isVip) {
      router.push('/events');
      return;
    }

    fetchDashboardStats();
  }, [isVip, router]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/vip/dashboard-stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        logger.info('VIP dashboard stats fetched successfully');
      } else {
        throw new Error('Failed to fetch dashboard stats');
      }
    } catch (error) {
      logger.error('Error fetching VIP dashboard stats', { error });
      addToast({
        type: 'error',
        message: 'Erro ao carregar estatísticas do dashboard',
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Meu Dashboard VIP</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-300">Total de Inscrições</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.totalApplications}</p>
          </div>

          <div className="bg-dark-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-300">Inscrições Pendentes</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.pendingApplications}</p>
          </div>

          <div className="bg-dark-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-300">Presenças Confirmadas</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.confirmedApplications}</p>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-dark-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Próximos Eventos</h2>
          
          <div className="space-y-4">
            {stats.upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors duration-200 cursor-pointer"
                onClick={() => router.push(`/events/${event.id}`)}
              >
                <div>
                  <h3 className="font-medium text-white">{event.name}</h3>
                  <p className="text-sm text-gray-400">
                    {new Date(event.date).toLocaleDateString()} às {event.time}
                  </p>
                  <p className="text-sm text-gray-400">{event.location}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'confirmed'
                      ? 'bg-green-500/20 text-green-400'
                      : event.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {event.status === 'confirmed'
                      ? 'Confirmado'
                      : event.status === 'pending'
                      ? 'Pendente'
                      : 'Rejeitado'}
                  </span>
                </div>
              </div>
            ))}

            {stats.upcomingEvents.length === 0 && (
              <p className="text-center text-gray-400 py-4">
                Nenhum evento próximo encontrado
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <button
            onClick={() => router.push('/events')}
            className="w-full p-4 bg-gradient-to-r from-accent-purple to-accent-pink rounded-xl text-white font-medium hover:from-accent-pink hover:to-accent-purple transition-all duration-300"
          >
            Explorar Eventos
          </button>
        </div>
      </div>
    </Layout>
  );
}
