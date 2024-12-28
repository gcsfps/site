import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

interface Application {
  id: string;
  eventId: string;
  event: {
    id: string;
    name: string;
    date: string;
    location: string;
    flyerUrl: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  applicationDate: string;
}

export default function MyApplications() {
  const { data: session } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session || session.user.type !== 'presenca_vip') {
      router.push('/login');
      return;
    }

    // Buscar candidaturas do usuário
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/applications/my-applications');
        const data = await response.json();
        setApplications(data.applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [session, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-yellow-500/20 text-yellow-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      default:
        return 'Pendente';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Minhas Candidaturas</h1>
          <Link
            href="/events"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-purple hover:bg-accent-purple/90 transition-colors duration-200"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ver Eventos Disponíveis
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-pink mx-auto"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-12 bg-dark-800/50 rounded-2xl border border-white/5">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-white">Nenhuma candidatura encontrada</h3>
            <p className="mt-2 text-gray-400">
              Explore os eventos disponíveis e candidate-se para trabalhar como presença VIP!
            </p>
            <Link
              href="/events"
              className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-purple hover:bg-accent-purple/90 transition-colors duration-200"
            >
              Ver Eventos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-dark-800/50 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-200"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={application.event.flyerUrl}
                    alt={application.event.name}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{application.event.name}</h3>
                  <p className="text-gray-400 mb-2">
                    {new Date(application.event.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-400 mb-4">{application.event.location}</p>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {getStatusText(application.status)}
                    </span>
                    <Link
                      href={`/events/${application.event.id}`}
                      className="text-accent-pink hover:text-accent-purple transition-colors duration-200"
                    >
                      Ver Evento
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
