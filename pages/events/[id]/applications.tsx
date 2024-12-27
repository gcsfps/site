import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../contexts/AuthContext';
import { IApplication, IEvent } from '../../../src/types';
import Image from 'next/image';

// Dados mockados para teste
const mockEvents: IEvent[] = [
  {
    id: '3',
    name: 'Reveillon 2024',
    date: new Date('2024-01-01T22:00:00'),
    location: 'Club Z, São Paulo',
    payment: 300,
    organizerId: 'ultimate',
    totalSpots: 200,
    availableSpots: 80,
    status: 'available',
    flyer: '/images/events/event3.jpg',
    description: 'Celebre a virada do ano no lugar mais exclusivo da cidade.',
  },
];

const mockApplications: { [key: string]: IApplication[] } = {
  '3': [
    {
      id: '1',
      eventId: '3',
      presencaVipId: '4',
      status: 'pending',
      applicationDate: new Date(),
      presencaVipInfo: {
        name: 'Presença VIP Test',
        whatsapp: '11999999999',
        photo: '/images/profile-placeholder.jpg',
      },
    },
  ],
};

export default function EventApplications() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [allApplications, setAllApplications] = useState<{ [key: string]: IApplication[] }>({});

  useEffect(() => {
    if (!isAuthenticated || user?.type !== 'organizer') {
      router.push('/login');
      return;
    }

    if (id) {
      // Carregar evento
      const foundEvent = mockEvents.find(e => e.id === id);
      if (foundEvent) {
        setEvent(foundEvent);
        // Carregar aplicações do evento
        setApplications(mockApplications[id as string] || []);
      }
    }
  }, [id, isAuthenticated, user, router]);

  const handleStatusChange = (applicationId: string, newStatus: 'approved' | 'rejected') => {
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        const updated = { ...app, status: newStatus };
        return updated;
      }
      return app;
    });

    // Atualizar estado local
    setApplications(updatedApplications);

    // Atualizar estado global
    const newAllApplications = {
      ...allApplications,
      [id as string]: updatedApplications,
    };
    setAllApplications(newAllApplications);

    // Atualizar vagas disponíveis se aprovado
    if (newStatus === 'approved' && event) {
      const updatedEvent = {
        ...event,
        availableSpots: event.availableSpots - 1,
      };
      const updatedEvents = allEvents.map(e => 
        e.id === event.id ? updatedEvent : e
      );
      setEvent(updatedEvent);
      setAllEvents(updatedEvents);
    }

    alert(`Solicitação ${newStatus === 'approved' ? 'aprovada' : 'rejeitada'} com sucesso!`);
  };

  const handleWhatsAppClick = (whatsapp: string) => {
    const formattedNumber = whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/55${formattedNumber}`, '_blank');
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
        return 'Rejeitada';
      default:
        return 'Pendente';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="gradient-text">Gerenciar Presenças</span>
              </h1>
              <h2 className="text-xl text-gray-400">{event?.name}</h2>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => router.push(`/events/${id}/confirmed`)}
                className="bg-accent-purple hover:bg-accent-pink text-white px-4 py-2 rounded-lg"
              >
                Ver Presenças Confirmadas
              </button>
              <button
                onClick={() => router.back()}
                className="bg-dark-800 hover:bg-dark-700 text-white px-4 py-2 rounded-lg"
              >
                Voltar
              </button>
            </div>
          </div>

          {/* Lista de Solicitações */}
          <div className="space-y-4">
            {applications.length > 0 ? (
              applications.map((application) => (
                <div
                  key={application.id}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-12 h-12">
                        <Image
                          src={application.presencaVipInfo.photo || '/images/profile-placeholder.jpg'}
                          alt={application.presencaVipInfo.name}
                          layout="fill"
                          className="rounded-full"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{application.presencaVipInfo.name}</h3>
                        <button
                          onClick={() => handleWhatsAppClick(application.presencaVipInfo.whatsapp)}
                          className="text-sm text-accent-purple hover:text-accent-pink"
                        >
                          WhatsApp: {application.presencaVipInfo.whatsapp}
                        </button>
                        <p className="text-sm text-gray-400">
                          Enviado em: {new Date(application.applicationDate).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(application.status)}`}>
                        {getStatusText(application.status)}
                      </span>
                      
                      {application.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStatusChange(application.id!, 'approved')}
                            className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1 rounded-lg text-sm"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => handleStatusChange(application.id!, 'rejected')}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded-lg text-sm"
                          >
                            Rejeitar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Nenhuma solicitação de presença recebida ainda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
