import Layout from '../components/Layout';
import { CalendarIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import EventCarousel from '../components/EventCarousel';

export default function Home() {
  return (
    <Layout>
      {/* Carrossel de Eventos */}
      <EventCarousel />

      {/* Features Section com efeito parallax */}
      <div className="bg-dark-800/90 backdrop-blur-sm py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-transparent to-dark-900 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="glass-card p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent-purple bg-opacity-20 mb-6">
                <CalendarIcon className="h-8 w-8 text-accent-purple" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Eventos Exclusivos</h3>
              <p className="text-gray-400">
                Acesso privilegiado aos eventos mais badalados da cidade.
              </p>
            </div>

            <div className="glass-card p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent-pink bg-opacity-20 mb-6">
                <UserGroupIcon className="h-8 w-8 text-accent-pink" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Network Premium</h3>
              <p className="text-gray-400">
                Conecte-se com pessoas influentes e expanda seu círculo social.
              </p>
            </div>

            <div className="glass-card p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent-blue bg-opacity-20 mb-6">
                <StarIcon className="h-8 w-8 text-accent-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Status VIP</h3>
              <p className="text-gray-400">
                Tratamento diferenciado e benefícios exclusivos em todos os eventos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Vídeo de fundo */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute min-w-full min-h-full object-cover opacity-60"
            style={{ filter: 'brightness(0.7)' }}
          >
            <source src="/videos/nightclub.mp4" type="video/mp4" />
          </video>
          {/* Overlay gradiente sobre o vídeo */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/90 via-dark-900/50 to-dark-900/90" />
          {/* Efeito de partículas/brilho */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-blue/10 mix-blend-overlay" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="min-h-screen flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mb-8 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue opacity-30 blur"></div>
                <h1 className="text-6xl md:text-8xl font-bold font-display mb-6 relative">
                  <span className="gradient-text drop-shadow-2xl">Experiências VIP</span>
                  <br />
                  <span className="text-white text-5xl md:text-7xl mt-4 block">Momentos Únicos</span>
                </h1>
              </div>
              <p className="mt-8 max-w-2xl mx-auto text-xl md:text-2xl text-gray-300 drop-shadow-lg">
                Conectando os melhores eventos às pessoas certas. 
                <br />
                <span className="text-accent-pink">Uma nova forma de viver a noite com exclusividade.</span>
              </p>
              <div className="mt-12 flex justify-center gap-6">
                <a href="/register" className="btn-primary text-lg">
                  Começar Agora
                </a>
                <a href="/about" className="btn-secondary text-lg">
                  Saiba Mais
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
