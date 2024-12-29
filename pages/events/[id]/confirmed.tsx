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
      status: 'approved',
      applicationDate: new Date(),
      presencaVipInfo: {
        name: 'Presença VIP Test',
        whatsapp: '11999999999',
        photo: '/images/profile-placeholder.jpg',
      },
    },
  ],
};

export default function ConfirmedPresences() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [confirmedPresences, setConfirmedPresences] = useState<IApplication[]>([]);
  const [userApplication, setUserApplication] = useState<IApplication | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (id) {
      // Carregar evento
      const foundEvent = mockEvents.find(e => e.id === id);
      if (foundEvent) {
        setEvent(foundEvent);

        // Carregar presenças confirmadas
        const eventApplications = mockApplications[id as string] || [];
        const confirmed = eventApplications.filter(app => app.status === 'approved');
        setConfirmedPresences(confirmed);

        // Se for presença VIP, verificar se está aprovado
        if (user?.type === 'vip') {
          const userApp = eventApplications.find(app => app.presencaVipId === user.id);
          setUserApplication(userApp || null);

          // Se não estiver aprovado, redirecionar
          if (!userApp || userApp.status !== 'approved') {
            router.push(`/events/${id}`);
          }
        }
      }
    }
  }, [id, isAuthenticated, user, router]);

  const handleWhatsAppClick = (whatsapp: string) => {
    const formattedNumber = whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/55${formattedNumber}`, '_blank');
  };

  const canViewList = user?.type === 'organizer' || (userApplication?.status === 'approved');

  if (!canViewList) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="gradient-text">Presenças Confirmadas</span>
              </h1>
              <h2 className="text-xl text-gray-400">{event?.name}</h2>
            </div>
            <button
              onClick={() => router.back()}
              className="bg-dark-800 hover:bg-dark-700 text-white px-4 py-2 rounded-lg"
            >
              Voltar
            </button>
          </div>

          {/* Lista de Presenças Confirmadas */}
          <div className="space-y-4">
            {confirmedPresences.length > 0 ? (
              confirmedPresences.map((presence) => (
                <div
                  key={presence.id}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-12 h-12">
                        <Image
                          src={presence.presencaVipInfo.photo || '/images/profile-placeholder.jpg'}
                          alt={presence.presencaVipInfo.name}
                          layout="fill"
                          className="rounded-full"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{presence.presencaVipInfo.name}</h3>
                        {user?.type === 'organizer' && (
                          <button
                            onClick={() => handleWhatsAppClick(presence.presencaVipInfo.whatsapp)}
                            className="text-sm text-accent-purple hover:text-accent-pink"
                          >
                            WhatsApp: {presence.presencaVipInfo.whatsapp}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        Confirmado
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Nenhuma presença confirmada ainda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
