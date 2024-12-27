import Layout from '../components/Layout';
import Image from 'next/image';
import { ShieldCheckIcon, UserGroupIcon, SparklesIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function About() {
  return (
    <Layout>
      <div className="min-h-screen bg-dark-900">
        {/* Hero Section */}
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 via-accent-pink/20 to-accent-blue/20 mix-blend-overlay" />
          
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Sobre a Agenda VIP</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transformando a maneira como você vive a noite. 
                Uma plataforma exclusiva que conecta pessoas a experiências únicas.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-20 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  <span className="gradient-text">Nossa Missão</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Criamos a Agenda VIP com um objetivo claro: revolucionar a experiência 
                  noturna nas principais cidades do Brasil. Nossa plataforma une 
                  tecnologia e exclusividade para oferecer aos nossos usuários acesso 
                  aos melhores eventos e experiências VIP.
                </p>
              </div>
              <div className="relative h-96">
                <Image
                  src="/images/about/mission.jpg"
                  alt="Nossa Missão"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass-card p-6 text-center">
                <ShieldCheckIcon className="h-12 w-12 text-accent-purple mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Segurança</h3>
                <p className="text-gray-300">
                  Sistema verificado e seguro para todas as transações e dados pessoais.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <UserGroupIcon className="h-12 w-12 text-accent-pink mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Comunidade VIP</h3>
                <p className="text-gray-300">
                  Faça parte de uma comunidade exclusiva de amantes da vida noturna.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <SparklesIcon className="h-12 w-12 text-accent-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Experiências Únicas</h3>
                <p className="text-gray-300">
                  Acesso a eventos exclusivos e experiências personalizadas.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <GlobeAltIcon className="h-12 w-12 text-accent-purple mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Alcance Nacional</h3>
                <p className="text-gray-300">
                  Presentes nas principais cidades e eventos do Brasil.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Numbers Section */}
        <div className="py-20 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">500+</div>
                <div className="text-gray-300">Eventos Realizados</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">50k+</div>
                <div className="text-gray-300">Usuários VIP</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">100+</div>
                <div className="text-gray-300">Parceiros Premium</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
