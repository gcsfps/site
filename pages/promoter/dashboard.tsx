import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUserPermissions } from '../../src/hooks/useUserPermissions';
import { useToast } from '../../contexts/ToastContext';
import { logger } from '../../src/lib/logger';

interface DashboardStats {
  totalEvents: number;
  activeEvents: number;
  totalApplications: number;
  pendingApplications: number;
  confirmedPresences: number;
}

export default function PromoterDashboard() {
  const router = useRouter();
  const { isPromoter } = useUserPermissions();
  const { addToast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    activeEvents: 0,
    totalApplications: 0,
    pendingApplications: 0,
    confirmedPresences: 0,
  });

  useEffect(() => {
    if (!isPromoter) {
      router.push('/events');
      return;
    }

    fetchDashboardStats();
  }, [isPromoter, router]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/promoter/dashboard-stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        logger.info('Dashboard stats fetched successfully');
      } else {
        throw new Error('Failed to fetch dashboard stats');
      }
    } catch (error) {
      logger.error('Error fetching dashboard stats', { error });
      addToast({
        type: 'error',
        message: 'Erro ao carregar estatísticas do dashboard',
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard do Promoter</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-300">Total de Eventos</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.totalEvents}</p>
          </div>

          <div className="bg-dark-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-300">Eventos Ativos</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.activeEvents}</p>
          </div>

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
            <p className="text-3xl font-bold text-white mt-2">{stats.confirmedPresences}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => router.push('/events/create')}
            className="p-4 bg-gradient-to-r from-accent-purple to-accent-pink rounded-xl text-white font-medium hover:from-accent-pink hover:to-accent-purple transition-all duration-300"
          >
            Criar Novo Evento
          </button>

          <button
            onClick={() => router.push('/events/manage')}
            className="p-4 bg-dark-800 border border-gray-700 rounded-xl text-white font-medium hover:bg-dark-700 transition-all duration-300"
          >
            Gerenciar Eventos
          </button>
        </div>
      </div>
    </Layout>
  );
}
