import Layout from '../../components/Layout';
import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

// Dados temporários
const events = [
  {
    id: 1,
    title: 'Noite Eletrônica',
    date: '30 Dezembro 2023',
    time: '22:00 - 06:00',
    location: 'Club X, São Paulo',
    image: '/images/events/event1.jpg',
    description: 'Uma noite incrível com os melhores DJs da cena eletrônica.',
  },
  {
    id: 2,
    title: 'Hip Hop Night',
    date: '31 Dezembro 2023',
    time: '23:00 - 07:00',
    location: 'Club Y, São Paulo',
    image: '/images/events/event2.jpg',
    description: 'O melhor do Hip Hop nacional e internacional.',
  },
  {
    id: 3,
    title: 'Reveillon 2024',
    date: '1 Janeiro 2024',
    time: '22:00 - 08:00',
    location: 'Club Z, São Paulo',
    image: '/images/events/event3.jpg',
    description: 'Celebre a virada do ano no lugar mais exclusivo da cidade.',
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
                <div className="glass-card overflow-hidden group">
                  <div className="relative h-64">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">{event.title}</h3>
                    
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-5 w-5 text-accent-purple" />
                        <span>{event.date}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="h-5 w-5 text-accent-pink" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="h-5 w-5 text-accent-blue" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="mt-4 text-gray-400">{event.description}</p>
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
