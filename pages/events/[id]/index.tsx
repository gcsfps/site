import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { CalendarIcon, MapPinIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useAuth } from '../../../contexts/AuthContext';
import { IEvent } from '../../../src/types';

// Dados temporários - mesmos eventos da página principal
const events: IEvent[] = [
  {
    id: '1',
    name: 'Noite Eletrônica',
    date: new Date('2024-12-30T22:00:00'),
    location: 'Club X, São Paulo',
    payment: 150,
    organizerId: '1', // basic@test.com
    totalSpots: 50,
    availableSpots: 30,
    status: 'available',
    flyer: '/images/events/event1.jpg',
    description: 'Uma noite incrível com os melhores DJs da cena eletrônica. Ambiente sofisticado e público selecionado.',
  },
  {
    id: '2',
    name: 'Hip Hop Night',
    date: new Date('2024-12-31T23:00:00'),
    location: 'Club Y, São Paulo',
    payment: 200,
    organizerId: '2', // premium@test.com
    totalSpots: 100,
    availableSpots: 45,
    status: 'available',
    flyer: '/images/events/event2.jpg',
    description: 'O melhor do Hip Hop nacional e internacional. Shows ao vivo e DJs renomados.',
  },
  {
    id: '3',
    name: 'Reveillon 2024',
    date: new Date('2024-01-01T22:00:00'),
    location: 'Club Z, São Paulo',
    payment: 300,
    organizerId: '3', // ultimate@test.com
    totalSpots: 200,
    availableSpots: 80,
    status: 'available',
    flyer: '/images/events/event3.jpg',
    description: 'Celebre a virada do ano no lugar mais exclusivo da cidade. Open bar premium e atrações internacionais.',
  },
];

// Simulação de aplicações
const mockApplications: { [eventId: string]: any[] } = {};

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);

  useEffect(() => {
    if (id) {
      const foundEvent = events.find(e => e.id === id);
      if (foundEvent) {
        setEvent(foundEvent);
        
        // Verificar se o usuário já se candidatou
        if (user?.type === 'presenca_vip') {
          const eventApplications = mockApplications[foundEvent.id] || [];
          const userApplication = eventApplications.find(app => app.presencaVipId === user.id);
          
          if (userApplication) {
            setHasApplied(true);
            setApplicationStatus(userApplication.status);
          } else {
            setHasApplied(false);
            setApplicationStatus(null);
          }
        }
      }
    }
  }, [id, user]);

  const handleApply = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.type !== 'presenca_vip') {
      alert('Apenas presenças VIP podem se candidatar aos eventos.');
      return;
    }

    if (hasApplied) {
      alert('Você já se candidatou para este evento.');
      return;
    }

    try {
      // Simular envio da aplicação
      const newApplication: any = {
        id: Date.now().toString(),
        eventId: event!.id,
        presencaVipId: user.id,
        status: 'pending',
        applicationDate: new Date(),
        presencaVipInfo: {
          name: user.name,
          whatsapp: user.whatsapp,
          photo: '/images/profile-placeholder.jpg',
        },
      };

      // Atualizar estado local
      mockApplications[event!.id] = [
        ...(mockApplications[event!.id] || []),
        newApplication,
      ];

      setHasApplied(true);
      setApplicationStatus('pending');
      alert('Sua candidatura foi enviada com sucesso! Aguarde a aprovação do promoter.');
    } catch (error) {
      console.error('Erro ao enviar candidatura:', error);
      alert('Erro ao enviar candidatura. Tente novamente.');
    }
  };

  if (!event) {
    return (
      <Layout>
        <div className="min-h-screen bg-dark-900 py-20">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-center text-gray-400">Carregando evento...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-card overflow-hidden">
            {/* Flyer do Evento */}
            <div className="relative h-96">
              <Image
                src={event.flyer}
                alt={event.name}
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
            </div>

            {/* Informações do Evento */}
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-6">{event.name}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <CalendarIcon className="h-6 w-6 mr-3 text-accent-purple" />
                    <div>
                      <p className="font-medium">Data</p>
                      <p>{event.date.toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <ClockIcon className="h-6 w-6 mr-3 text-accent-pink" />
                    <div>
                      <p className="font-medium">Horário</p>
                      <p>{event.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <MapPinIcon className="h-6 w-6 mr-3 text-accent-blue" />
                    <div>
                      <p className="font-medium">Local</p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <CurrencyDollarIcon className="h-6 w-6 mr-3 text-green-400" />
                    <div>
                      <p className="font-medium">Valor</p>
                      <p>{event.payment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                  </div>

                  <div className="text-gray-300">
                    <p className="font-medium mb-1">Vagas</p>
                    <div className="flex items-center space-x-4">
                      <span className="text-accent-purple">{event.availableSpots} disponíveis</span>
                      <span className="text-gray-400">de {event.totalSpots} totais</span>
                    </div>
                  </div>

                  <div className="text-gray-300">
                    <p className="font-medium mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      event.status === 'available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {event.status === 'available' ? 'Disponível' : 'Lotado'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Descrição</h2>
                <p className="text-gray-300">{event.description}</p>
              </div>

              {/* Botão de Candidatura */}
              {user?.type === 'presenca_vip' && (
                <div className="flex flex-col items-center space-y-4">
                  {!hasApplied ? (
                    <button
                      onClick={handleApply}
                      disabled={event.status !== 'available'}
                      className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold ${
                        event.status === 'available'
                          ? 'bg-accent-purple hover:bg-accent-pink text-white'
                          : 'bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Candidatar-se
                    </button>
                  ) : (
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-2">
                        Status da sua candidatura:
                      </p>
                      <span className={`px-4 py-2 rounded-full text-sm ${
                        applicationStatus === 'approved'
                          ? 'bg-green-500/20 text-green-400'
                          : applicationStatus === 'rejected'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {applicationStatus === 'approved'
                          ? 'Aprovada'
                          : applicationStatus === 'rejected'
                          ? 'Rejeitada'
                          : 'Pendente'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
