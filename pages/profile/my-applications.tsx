import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, ClockIcon } from '../../components/Icons';

interface Event {
  id: string;
  name: string;
  flyerUrl: string;
  date: string;
  time: string;
  location: string;
}

interface Application {
  id: string;
  status: string;
  createdAt: string;
  event: Event;
}

export default function MyApplications() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.type === 'presence') {
      fetchApplications();
    }
  }, [session]);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications/my-applications');
      if (!response.ok) throw new Error('Erro ao buscar candidaturas');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        return 'Aprovada';
      case 'rejected':
        return 'Recusada';
      default:
        return 'Pendente';
    }
  };

  if (!session || session.user.type !== 'presence') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            Acesso restrito a presenças VIP
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Minhas Candidaturas</h1>

        {isLoading ? (
          <div className="text-center text-gray-400">Carregando...</div>
        ) : applications.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>Você ainda não se candidatou a nenhum evento.</p>
            <Link href="/" className="text-accent-purple hover:text-accent-pink mt-2 inline-block">
              Ver eventos disponíveis
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) => (
              <div key={application.id} className="glass-card overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={application.event.flyerUrl || '/images/event-placeholder.jpg'}
                    alt={application.event.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(application.status)}`}>
                      {getStatusText(application.status)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    <Link href={`/events/${application.event.id}`} className="hover:text-accent-purple">
                      {application.event.name}
                    </Link>
                  </h3>

                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-accent-purple" />
                      {new Date(application.event.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2 text-accent-pink" />
                      {application.event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2 text-accent-blue" />
                      {application.event.location}
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-400">
                    Candidatura enviada em:{' '}
                    {new Date(application.createdAt).toLocaleDateString('pt-BR')}
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
