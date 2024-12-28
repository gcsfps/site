import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  imageUrl: string;
}

export default function MyEvents() {
  const { data: session } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.type === 'organizer') {
      fetchEvents();
    }
  }, [session, router]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events/my-events');
      if (response.ok) {
        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  if (!session || session.user.type !== 'organizer') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12 bg-dark-800/50 rounded-2xl border border-white/5">
            <p className="text-gray-400">
              Apenas organizadores podem acessar esta página
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Meus Eventos</h1>
          <Link
            href="/events/create"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-purple hover:bg-accent-purple/90 transition-colors duration-200"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Criar Novo Evento
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-pink mx-auto"></div>
          </div>
        ) : !Array.isArray(events) || events.length === 0 ? (
          <div className="text-center py-12 bg-dark-800/50 rounded-2xl border border-white/5">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-white">Nenhum evento encontrado</h3>
            <p className="mt-2 text-gray-400">Comece criando seu primeiro evento!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-dark-800/50 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-200"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-400 mb-4">
                    {new Date(event.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${event.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        event.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                      }`}>
                      {event.status === 'approved' ? 'Aprovado' :
                        event.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                    </span>
                    <Link
                      href={`/events/${event.id}/edit`}
                      className="text-accent-pink hover:text-accent-purple transition-colors duration-200"
                    >
                      Editar
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
