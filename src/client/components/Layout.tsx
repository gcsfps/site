import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary-600">AGENDA VIP</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/events" className="text-gray-700 hover:text-primary-600">
                Eventos
              </Link>
              <Link href="/login" className="btn-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            © {new Date().getFullYear()} Agenda VIP. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
