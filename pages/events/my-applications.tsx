import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { IEvent } from '../../src/types';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function MyApplications() {
  const [applications, setApplications] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Redirecionar para a página apropriada com base no tipo de usuário
    if (user?.type === 'promoter') {
      router.push('/events/manage');
      return;
    }

    if (user?.type !== 'vip') {
      router.push('/');
      return;
    }

    // Carregar candidaturas do usuário VIP
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/applications/my');
        if (!response.ok) {
          throw new Error('Erro ao buscar candidaturas');
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Erro ao buscar candidaturas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.type !== 'vip') {
    return null;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Carregando candidaturas...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Minhas Candidaturas</h1>

        {applications.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Você ainda não se candidatou a nenhum evento
            </h2>
            <p className="text-gray-500 mb-6">
              Explore os eventos disponíveis e candidate-se!
            </p>
            <button
              onClick={() => router.push('/events')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
            >
              Ver Eventos Disponíveis
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((event) => (
              <div key={event.id} className="glass-card overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={event.flyerUrl || '/images/event-placeholder.jpg'}
                    alt={event.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
                    <div className="flex items-center text-gray-200 mb-2">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      {new Date(event.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center text-gray-200 mb-2">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-200">
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      {event.location}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === 'approved' 
                        ? 'bg-green-100 text-green-800'
                        : event.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status === 'approved' 
                        ? 'Aprovada'
                        : event.status === 'rejected'
                        ? 'Rejeitada'
                        : 'Pendente'}
                    </span>
                  </div>
                  <button
                    onClick={() => router.push(`/events/${event.id}`)}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
