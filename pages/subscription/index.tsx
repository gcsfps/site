import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function Subscription() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Assinatura</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Planos disponíveis</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Plano Básico */}
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Plano Básico</h3>
              <p className="text-gray-600 mb-4">Perfeito para começar</p>
              <ul className="space-y-2 mb-6">
                <li>✓ Acesso a eventos básicos</li>
                <li>✓ Perfil personalizado</li>
                <li>✓ Suporte por email</li>
              </ul>
              <p className="text-2xl font-bold mb-4">R$ 29,90/mês</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Assinar
              </button>
            </div>

            {/* Plano Premium */}
            <div className="border rounded-lg p-6 bg-blue-50">
              <h3 className="text-xl font-bold mb-2">Plano Premium</h3>
              <p className="text-gray-600 mb-4">Para usuários avançados</p>
              <ul className="space-y-2 mb-6">
                <li>✓ Tudo do Plano Básico</li>
                <li>✓ Acesso prioritário a eventos</li>
                <li>✓ Descontos exclusivos</li>
                <li>✓ Suporte prioritário</li>
              </ul>
              <p className="text-2xl font-bold mb-4">R$ 59,90/mês</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Assinar
              </button>
            </div>

            {/* Plano Ultimate */}
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Plano Ultimate</h3>
              <p className="text-gray-600 mb-4">Experiência VIP completa</p>
              <ul className="space-y-2 mb-6">
                <li>✓ Tudo do Plano Premium</li>
                <li>✓ Eventos exclusivos</li>
                <li>✓ Benefícios VIP</li>
                <li>✓ Suporte 24/7</li>
              </ul>
              <p className="text-2xl font-bold mb-4">R$ 99,90/mês</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Assinar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
