import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import PlanIcon from '../../components/PlanIcon';

interface Promoter {
  id: string;
  name: string;
  email: string;
  subscription?: {
    plan: string;
    status: string;
  };
  _count: {
    events: number;
  };
}

interface PromotersPageProps {
  promoters: Promoter[];
}

export default function Promoters({ promoters }: PromotersPageProps) {
  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Promoters
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-400 sm:mt-4">
              Conheça nossos promoters e seus eventos
            </p>
          </div>

          <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
            {promoters.map((promoter) => (
              <div
                key={promoter.id}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-dark-800"
              >
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <p className="text-xl font-semibold text-white">{promoter.name}</p>
                      {promoter.subscription?.status === 'active' && (
                        <PlanIcon
                          plan={promoter.subscription.plan as 'Ultimate' | 'Premium' | 'Basic'}
                          size="sm"
                        />
                      )}
                    </div>
                    <p className="mt-3 text-base text-gray-400">
                      {promoter._count.events} eventos
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/promoters/${promoter.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent-purple hover:bg-accent-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
                    >
                      Ver Perfil
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const promoters = await prisma.user.findMany({
    where: {
      type: 'organizer',
    },
    select: {
      id: true,
      name: true,
      email: true,
      subscription: {
        select: {
          plan: true,
          status: true,
        },
      },
      _count: {
        select: {
          events: true,
        },
      },
    },
  });

  return {
    props: {
      promoters: JSON.parse(JSON.stringify(promoters)),
    },
  };
};
