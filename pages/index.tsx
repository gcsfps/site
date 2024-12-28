import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import EventCarousel from '../components/EventCarousel';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon } from '../components/Icons';

interface Event {
  id: string;
  name: string;
  flyerUrl: string;
  date: string;
  location: string;
  featured?: boolean;
}

const EventCard = ({ event }: { event: Event }) => {
  return (
    <Link href={`/events/${event.id}`} className="block">
      <div className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-200">
        <div className="relative aspect-[16/9]">
          <Image
            src={event.flyerUrl || '/images/event-placeholder.jpg'}
            alt={event.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
            <div className="flex items-center text-gray-200 mb-2">
              <CalendarIcon className="h-5 w-5 mr-2" />
              {new Date(event.date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center text-gray-200">
              <MapPinIcon className="h-5 w-5 mr-2" />
              {event.location}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Erro ao buscar eventos');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Layout>
      {/* Próximos Eventos Section */}
      <section className="relative min-h-screen">
        {/* Organic Background */}
        <div className="organic-background">
          {/* Floating Shapes */}
          <div className="organic-shape shape-1"></div>
          <div className="organic-shape shape-2"></div>
          <div className="organic-shape shape-3"></div>
          
          {/* Noise Overlay */}
          <div className="floating-overlay"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-accent-pink to-accent-purple animate-gradient-x">
                Próximos Eventos
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Confira os eventos mais exclusivos da noite
              </p>
            </div>
            
            {/* Events Grid */}
            <div className="content-wrapper p-8">
              {!isLoading && (
                <>
                  {events.some(event => event.featured) && (
                    <EventCarousel events={events.filter(event => event.featured)} />
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute min-w-full min-h-full object-cover"
          >
            <source src="/videos/nightclub.mp4" type="video/mp4" />
          </video>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/90 via-dark-900/50 to-dark-900/90" />
          
          {/* Accent Color Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-blue/10 mix-blend-overlay" />
          
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-noise opacity-30" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-purple opacity-30 blur"></div>
                <h1 className="relative text-6xl md:text-8xl font-bold font-display mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-accent-pink to-accent-purple animate-gradient-x">
                    Bem vindo a
                  </span>
                  <br />
                  <span className="text-white text-5xl md:text-7xl mt-4 block">
                    Agenda VIP
                  </span>
                </h1>
              </div>
              <p className="mt-8 max-w-2xl mx-auto text-xl md:text-2xl text-gray-300">
                Conectando os melhores eventos às pessoas certas. 
                <br />
                <span className="text-accent-pink">Uma nova forma de viver a noite com exclusividade.</span>
              </p>
              <div className="mt-12 flex justify-center gap-6">
                <Link
                  href="/register"
                  className="relative group px-8 py-3 bg-gradient-to-r from-accent-purple to-accent-pink rounded-xl text-white font-medium transition-all duration-300"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple to-accent-pink rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <span className="relative">Começar Agora</span>
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium backdrop-blur-sm transition-all duration-300"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
