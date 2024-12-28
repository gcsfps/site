import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import PlanIcon from '../components/PlanIcon';

const plans = [
  {
    name: 'Basic',
    price: 99.90,
    features: [
      '3 eventos simultâneos',
      '10 presenças por evento',
      '4 flyers por mês',
      'Suporte por email',
      'Acesso aos perfis'
    ]
  },
  {
    name: 'Premium',
    price: 199.90,
    features: [
      '5 eventos simultâneos',
      '20 presenças por evento',
      'Flyers ilimitados',
      'Analytics e relatórios',
      'Suporte prioritário',
      'Acesso aos perfis'
    ]
  },
  {
    name: 'Ultimate',
    price: 399.90,
    features: [
      'Eventos ilimitados',
      'Presenças ilimitadas',
      'Todos os recursos premium',
      'Personalização de marca',
      'Recursos exclusivos',
      'Suporte VIP 24/7'
    ]
  }
];

export default function Plans() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Escolha seu Plano</h1>
          <p className="text-xl text-gray-400">
            Acesse eventos exclusivos e benefícios únicos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-dark-800/50 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-200"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <PlanIcon plan={plan.name as 'Ultimate' | 'Premium' | 'Basic'} size="lg" />
                    <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-4xl font-bold text-white">
                    R$ {plan.price.toFixed(2)}
                    <span className="text-lg font-normal text-gray-400">/mês</span>
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-accent-pink mr-3 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={async () => {
                    // Implementar lógica de assinatura
                    try {
                      const response = await fetch('/api/subscription/create', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          plan: plan.name,
                        }),
                      });
                      
                      if (response.ok) {
                        window.location.href = '/profile/subscription';
                      }
                    } catch (error) {
                      console.error('Error subscribing to plan:', error);
                    }
                  }}
                  className="w-full py-3 px-6 text-center text-white bg-accent-purple hover:bg-accent-purple/90 rounded-xl transition-colors duration-200"
                >
                  Assinar Plano
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
