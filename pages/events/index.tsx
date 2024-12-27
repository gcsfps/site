import Layout from '../../components/Layout';
import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { IEvent } from '../../src/types';

// Dados temporários
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

export default function Events() {
  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">
            <span className="gradient-text">Eventos</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="glass-card overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
                  <div className="relative h-64">
                    <Image
                      src={event.flyer}
                      alt={event.name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                      <p className="text-gray-300 text-sm">
                        {event.payment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center text-gray-300">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      <span>{event.date.toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      <span>{event.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-accent-purple">
                        {event.availableSpots} vagas disponíveis
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        event.status === 'available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {event.status === 'available' ? 'Disponível' : 'Lotado'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
