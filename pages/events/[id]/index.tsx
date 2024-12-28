import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Layout from '../../../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, ClockIcon, CurrencyDollarIcon } from '../../../components/Icons';

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  flyerUrl: string;
  totalSpots: number;
  availableSpots: number;
  payment: number;
  status: string;
  organizerId: string;
  organizer: {
    name: string;
    establishmentName: string;
  };
}

interface Application {
  id: string;
  status: string;
  createdAt: string;
}

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState<Application | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEvent();
      if (session?.user?.type === 'presence') {
        fetchApplication();
      }
    }
  }, [id, session]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${id}`);
      if (!response.ok) throw new Error('Erro ao carregar evento');
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/applications/check/${id}`);
      if (!response.ok) throw new Error('Erro ao verificar candidatura');
      const data = await response.json();
      setApplication(data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleApply = async () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setIsApplying(true);
    try {
      const response = await fetch('/api/applications/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao se candidatar');
      }

      const data = await response.json();
      setApplication(data);
      alert('Candidatura enviada com sucesso!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao se candidatar');
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">Carregando evento...</div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">Evento não encontrado</div>
        </div>
      </Layout>
    );
  }

  const isOrganizer = session?.user?.type === 'organizer';
  const isEventOwner = session?.user?.id === event.organizerId;
  const isPresence = session?.user?.type === 'presence';
  const canApply = isPresence && !application;
  const hasApplied = application !== null;

  const getApplicationStatus = () => {
    if (!application) return null;
    switch (application.status) {
      case 'pending':
        return 'Candidatura em análise';
      case 'approved':
        return 'Candidatura aprovada';
      case 'rejected':
        return 'Candidatura recusada';
      default:
        return 'Status desconhecido';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="glass-card overflow-hidden">
          <div className="relative aspect-[21/9]">
            <Image
              src={event.flyerUrl || '/images/event-placeholder.jpg'}
              alt={event.name}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-4xl font-bold text-white">{event.name}</h1>
              {isEventOwner && (
                <Link
                  href={`/events/${event.id}/edit`}
                  className="btn-secondary"
                >
                  Editar Evento
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center">
                    <CalendarIcon className="h-6 w-6 mr-3 text-accent-purple" />
                    {new Date(event.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-6 w-6 mr-3 text-accent-pink" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-6 w-6 mr-3 text-accent-blue" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="h-6 w-6 mr-3 text-accent-green" />
                    R$ {event.payment.toFixed(2)}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Sobre o Evento</h3>
                  <p className="text-gray-300 whitespace-pre-wrap">{event.description}</p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Organizador</h3>
                  <p className="text-gray-300">{event.organizer.establishmentName}</p>
                </div>
              </div>

              <div>
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Vagas</h3>
                  <div className="text-gray-300 mb-6">
                    <p>Total: {event.totalSpots}</p>
                    <p>Disponíveis: {event.availableSpots}</p>
                  </div>

                  {canApply && (
                    <button
                      onClick={handleApply}
                      disabled={isApplying}
                      className="w-full btn-primary"
                    >
                      {isApplying ? 'Enviando...' : 'Candidatar-se'}
                    </button>
                  )}

                  {hasApplied && (
                    <div className="text-center p-4 rounded-lg bg-dark-800">
                      <p className="text-gray-300">{getApplicationStatus()}</p>
                    </div>
                  )}

                  {!isPresence && !isEventOwner && (
                    <p className="text-center text-gray-400 mt-4">
                      Apenas presenças VIP podem se candidatar a este evento
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
