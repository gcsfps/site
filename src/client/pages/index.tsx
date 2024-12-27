import Layout from '../components/Layout';
import { CalendarIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Conectando</span>
          <span className="block text-primary-600">Eventos e Presenças VIP</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A plataforma ideal para organizadores de eventos e presenças VIP se conectarem de forma profissional e eficiente.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <a href="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10">
              Começar Agora
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <CalendarIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Eventos Exclusivos</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Acesso aos melhores eventos e oportunidades do mercado.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <UserGroupIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Networking</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Conecte-se com profissionais e expanda sua rede.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <StarIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Reputação</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Sistema de avaliação para garantir qualidade e profissionalismo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
