import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ContactSidebar from './ContactSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-dark-900">
      <nav className="bg-black border-b border-zinc-900 fixed w-full z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-14">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo-modern-v3.svg"
                  alt="AGENDA VIP"
                  width={200}
                  height={40}
                  className="h-8 w-auto hover:opacity-80 transition-opacity duration-300"
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {children}
      </main>

      <footer className="bg-dark-800 border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="/images/logo-modern-v3.svg"
              alt="AGENDA VIP"
              width={160}
              height={32}
              className="h-6 w-auto opacity-60"
            />
            <div className="text-gray-400">
              {new Date().getFullYear()} Agenda VIP. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>

      <ContactSidebar />
    </div>
  );
}
