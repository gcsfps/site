"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';

export default function SubscriptionSuccess() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    // Verificar se o usuário tem uma assinatura ativa
    const checkSubscription = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const userData = await response.json();
          if (!userData.subscription || userData.subscription.status !== 'active') {
            router.push('/subscription');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar assinatura:', error);
      }
    };

    checkSubscription();
  }, [session, router]);

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="glass-card p-8 text-center">
            <div className="mb-8">
              <svg
                className="mx-auto h-16 w-16 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
              >
                <circle
                  className="opacity-25"
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M14 24l8 8 16-16"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Assinatura Confirmada!</span>
            </h1>

            <p className="text-gray-300 mb-8">
              Parabéns! Sua assinatura foi ativada com sucesso.
              Agora você tem acesso a todos os benefícios do seu plano.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => router.push('/events/create')}
                className="btn-primary w-full"
              >
                Criar Meu Primeiro Evento
              </button>
              <button
                onClick={() => router.push('/profile')}
                className="btn-secondary w-full"
              >
                Ir para Meu Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
