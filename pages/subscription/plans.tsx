"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';

interface PlanDetails {
  name: string;
  price: number;
  features: string[];
}

const plans: { [key: string]: PlanDetails } = {
  basic: {
    name: 'Plano Básico',
    price: 29.90,
    features: [
      'Acesso a eventos básicos',
      'Perfil personalizado',
      'Suporte por email'
    ]
  },
  premium: {
    name: 'Plano Premium',
    price: 59.90,
    features: [
      'Todos os benefícios do Básico',
      'Acesso prioritário a eventos',
      'Suporte prioritário',
      'Descontos exclusivos'
    ]
  },
  ultimate: {
    name: 'Plano Ultimate',
    price: 99.90,
    features: [
      'Todos os benefícios do Premium',
      'Acesso VIP garantido',
      'Eventos exclusivos',
      'Suporte 24/7',
      'Benefícios surpresa'
    ]
  }
};

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // Se não estiver autenticado, redireciona para login
    if (!session) {
      router.push('/login');
      return;
    }

    // Pega o plano da URL
    const { plan } = router.query;
    if (plan && typeof plan === 'string' && plans[plan]) {
      setSelectedPlan(plan);
    }
  }, [session, router]);

  const handleSubscribe = async () => {
    if (!selectedPlan || !session) return;

    setLoading(true);
    try {
      const response = await fetch('/api/subscription/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar assinatura');
      }

      // Redireciona para a página de pagamento ou confirmação
      router.push('/subscription/success');
    } catch (error) {
      console.error('Erro ao assinar:', error);
      alert('Erro ao processar sua assinatura. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  const plan = selectedPlan ? plans[selectedPlan] : null;

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="glass-card p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
              <span className="gradient-text">Confirmar Assinatura</span>
            </h1>

            {plan ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <p className="text-3xl font-bold text-accent-purple">
                    R$ {plan.price.toFixed(2)}<span className="text-sm text-gray-400">/mês</span>
                  </p>
                </div>

                <div className="border-t border-b border-gray-700 py-6 my-6">
                  <h3 className="text-lg font-semibold mb-4">Benefícios inclusos:</h3>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="text-accent-pink mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="btn-primary w-full"
                  >
                    {loading ? 'Processando...' : 'Confirmar Assinatura'}
                  </button>
                  <button
                    onClick={() => router.push('/subscription')}
                    className="btn-secondary w-full"
                  >
                    Voltar
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-400 mb-4">Plano não encontrado</p>
                <button
                  onClick={() => router.push('/subscription')}
                  className="btn-secondary"
                >
                  Voltar para Planos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
