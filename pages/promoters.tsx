import Layout from '../components/Layout';
import Image from 'next/image';
import { StarIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline';

// Dados temporários dos promoters
const promoters = [
  {
    id: 1,
    name: 'João Silva',
    image: '/images/promoters/promoter1.jpg',
    specialties: ['Festas Eletrônicas', 'Pool Parties'],
    events: 150,
    rating: 4.8,
    followers: '15K'
  },
  {
    id: 2,
    name: 'Maria Santos',
    image: '/images/promoters/promoter2.jpg',
    specialties: ['Hip Hop', 'R&B Nights'],
    events: 120,
    rating: 4.9,
    followers: '12K'
  },
  {
    id: 3,
    name: 'Pedro Costa',
    image: '/images/promoters/promoter3.jpg',
    specialties: ['Sertanejo', 'Funk'],
    events: 200,
    rating: 4.7,
    followers: '20K'
  }
];

export default function Promoters() {
  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Nossos Promoters</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Conheça os melhores promoters da cidade. Profissionais experientes que organizam
              os eventos mais exclusivos e memoráveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promoters.map((promoter) => (
              <div key={promoter.id} className="glass-card group hover:scale-105 transition-transform duration-300">
                <div className="relative h-64 rounded-t-lg overflow-hidden">
                  <Image
                    src={promoter.image}
                    alt={promoter.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{promoter.name}</h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <StarIcon className="h-5 w-5 text-accent-purple" />
                      <span>{promoter.rating} Rating</span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-300">
                      <CalendarIcon className="h-5 w-5 text-accent-pink" />
                      <span>{promoter.events}+ Eventos Realizados</span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-300">
                      <UserGroupIcon className="h-5 w-5 text-accent-blue" />
                      <span>{promoter.followers} Seguidores</span>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-white font-semibold mb-2">Especialidades:</h4>
                      <div className="flex flex-wrap gap-2">
                        {promoter.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm bg-accent-purple/20 text-accent-purple"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="btn-primary w-full mt-6">
                    Ver Eventos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
