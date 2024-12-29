"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Link from 'next/link';

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
  status: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  type: string;
  subscription?: {
    status: string;
    type: string;
  };
}

export default function MyEvents() {
  const { data: session } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    // Buscar informações do usuário
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);

          // Redirecionar VIPs para a página de candidaturas
          if (userData.type === 'vip') {
            router.push('/events/my-applications');
            return;
          }

          // Verificar assinatura para promoters
          if (userData.type === 'promoter') {
            if (!userData.subscription || userData.subscription.status !== 'active') {
              router.push('/subscription');
              return;
            }
            
            // Buscar eventos apenas se for promoter com assinatura ativa
            const eventsResponse = await fetch('/api/events/my-events');
            if (eventsResponse.ok) {
              const eventsData = await eventsResponse.json();
              setEvents(eventsData);
            } else {
              setError('Erro ao carregar eventos');
            }
          }
        } else {
          setError('Erro ao carregar informações do usuário');
        }
      } catch (error) {
        setError('Erro ao conectar com o servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [session, router]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-dark-900 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-accent-purple"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-dark-900 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="glass-card p-8">
              <div className="text-red-500 text-center">{error}</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              <span className="gradient-text">Meus Eventos</span>
            </h1>
            <Link href="/events/create" className="btn-primary">
              Criar Novo Evento
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <p className="text-gray-400 mb-4">Você ainda não tem eventos criados.</p>
              <Link href="/events/create" className="btn-secondary">
                Criar Primeiro Evento
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="glass-card p-6">
                  {event.flyerUrl && (
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={event.flyerUrl}
                        alt={event.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{event.description}</p>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>Data: {new Date(event.date).toLocaleDateString()}</p>
                    <p>Horário: {event.time}</p>
                    <p>Local: {event.location}</p>
                    <p>Vagas: {event.availableSpots}/{event.totalSpots}</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      href={`/events/${event.id}/applications`}
                      className="text-accent-purple hover:text-accent-pink"
                    >
                      Ver Candidaturas
                    </Link>
                    <Link
                      href={`/events/${event.id}/edit`}
                      className="text-accent-purple hover:text-accent-pink"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
