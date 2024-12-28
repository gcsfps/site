import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { IEvent, IApplication } from '../../src/types';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ManageEvents() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [applications, setApplications] = useState<{ [key: string]: IApplication[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Proteger a rota
    if (!isAuthenticated || user?.type !== 'organizer') {
      router.push('/login');
      return;
    }

    // Carregar eventos do promoter
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Erro ao buscar eventos');
        }
        const data = await response.json();
        // Converter as datas para objetos Date
        const eventsWithDates = data.map(event => ({
          ...event,
          date: new Date(event.date)
        }));
        setEvents(eventsWithDates);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Carregando eventos...</h1>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-dark-900 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="gradient-text">Meus Eventos</span>
              </h1>
              <button
                onClick={() => router.push('/events/create')}
                className="bg-accent-purple hover:bg-accent-pink text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Criar Novo Evento
              </button>
            </div>
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">Você ainda não tem eventos cadastrados.</p>
              <button
                onClick={() => router.push('/events/create')}
                className="bg-accent-purple hover:bg-accent-pink text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Criar Primeiro Evento
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const handleApplicationStatus = (eventId: string, applicationId: string, newStatus: 'approved' | 'rejected') => {
    setApplications(prev => {
      const eventApplications = [...(prev[eventId] || [])];
      const applicationIndex = eventApplications.findIndex(app => app.id === applicationId);
      
      if (applicationIndex !== -1) {
        eventApplications[applicationIndex] = {
          ...eventApplications[applicationIndex],
          status: newStatus,
        };
      }

      return {
        ...prev,
        [eventId]: eventApplications,
      };
    });
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-yellow-500/20 text-yellow-400';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Meus Eventos</span>
            </h1>
            <button
              onClick={() => router.push('/events/create')}
              className="bg-accent-purple hover:bg-accent-pink text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Criar Novo Evento
            </button>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {events.map((event) => (
              <div key={event.id} className="glass-card overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Imagem do Evento */}
                  <div className="relative w-full md:w-64 h-48 md:h-auto">
                    <Image
                      src={event.flyer}
                      alt={event.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  {/* Informações do Evento */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <h2 className="text-2xl font-bold mb-2 md:mb-0">{event.name}</h2>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => router.push(`/events/${event.id}/edit`)}
                          className="bg-dark-800 hover:bg-dark-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => router.push(`/events/${event.id}/applications`)}
                          className="bg-accent-purple hover:bg-accent-pink text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          Ver Candidaturas
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-gray-300">
                        <CalendarIcon className="h-5 w-5 mr-2 text-accent-purple" />
                        {event.date.toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <ClockIcon className="h-5 w-5 mr-2 text-accent-pink" />
                        {event.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPinIcon className="h-5 w-5 mr-2 text-accent-blue" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <UserGroupIcon className="h-5 w-5 mr-2 text-green-400" />
                        {event.availableSpots} vagas disponíveis
                      </div>
                    </div>

                    {/* Candidaturas Recentes */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Candidaturas Recentes</h3>
                      {applications[event.id]?.length > 0 ? (
                        <div className="space-y-4">
                          {applications[event.id].map((application) => (
                            <div
                              key={application.id}
                              className="flex items-center justify-between bg-dark-800 rounded-lg p-4"
                            >
                              <div className="flex items-center">
                                <div className="relative h-10 w-10 mr-4">
                                  <Image
                                    src={application.presencaVipInfo.photo || '/images/profile-placeholder.jpg'}
                                    alt={application.presencaVipInfo.name}
                                    layout="fill"
                                    className="rounded-full"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{application.presencaVipInfo.name}</p>
                                  <p className="text-sm text-gray-400">
                                    {new Date(application.applicationDate).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-4">
                                <span className={`px-3 py-1 rounded-full text-sm ${getApplicationStatusColor(application.status)}`}>
                                  {application.status === 'approved'
                                    ? 'Aprovada'
                                    : application.status === 'rejected'
                                    ? 'Rejeitada'
                                    : 'Pendente'}
                                </span>
                                {application.status === 'pending' && (
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleApplicationStatus(event.id, application.id, 'approved')}
                                      className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1 rounded-lg text-sm"
                                    >
                                      Aprovar
                                    </button>
                                    <button
                                      onClick={() => handleApplicationStatus(event.id, application.id, 'rejected')}
                                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded-lg text-sm"
                                    >
                                      Rejeitar
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400">Nenhuma candidatura recebida ainda.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
