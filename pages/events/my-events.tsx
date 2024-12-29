import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  flyerUrl?: string;
  totalSpots: number;
  availableSpots: number;
}

export default function MyEvents() {
  const { data: session } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events/my-events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [session, router]);

  if (!session) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Meus Eventos</h1>
        
        {loading ? (
          <div className="text-center">Carregando...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Você ainda não tem eventos.</p>
            <button
              onClick={() => router.push('/events/create')}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Criar Evento
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {event.flyerUrl && (
                  <div className="relative h-48">
                    <Image
                      src={event.flyerUrl}
                      alt={event.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  <div className="text-sm text-gray-500">
                    <p>Data: {new Date(event.date).toLocaleDateString()}</p>
                    <p>Horário: {event.time}</p>
                    <p>Local: {event.location}</p>
                    <p>Vagas disponíveis: {event.availableSpots}/{event.totalSpots}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => router.push(`/events/${event.id}/edit`)}
                      className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => router.push(`/events/${event.id}/applications`)}
                      className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                    >
                      Ver Inscrições
                    </button>
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
