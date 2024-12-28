import { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useAuth } from '../contexts/AuthContext';
import { Menu, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import PlanIcon from './PlanIcon';
import CustomCursor from './CustomCursor';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    if (user?.email === 'gabrielcordeiromail@gmail.com') {
      setSubscription({ plan: 'Ultimate', status: 'active' });
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  // Pega o primeiro nome do usuário
  const firstName = user?.name?.split(' ')[0] || '';

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-dark-900">
        {/* Header */}
        <header className="bg-dark-800/80 backdrop-blur-sm fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo e Links Principais */}
              <div className="flex items-center">
                <Link href="/" className="text-white text-2xl font-bold">
                  AGENDA VIP
                </Link>
                
                {/* Links principais - só aparecem se estiver logado */}
                {user && (
                  <nav className="ml-10 flex items-center space-x-4">
                    <Link
                      href="/profile/my-events"
                      className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                    >
                      Meus Eventos
                    </Link>
                  </nav>
                )}
              </div>

              {/* Lado direito - Login/Register ou Menu do Usuário */}
              <div className="flex items-center">
                {user ? (
                  <div className="relative inline-block">
                    {/* Menu Trigger */}
                    <div className="group">
                      <button className="flex items-center space-x-3 text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-lg hover:shadow-accent-purple/20 transition-all duration-300">
                        {subscription?.plan && (
                          <div className="flex-shrink-0">
                            <PlanIcon plan={subscription.plan as 'Ultimate' | 'Premium' | 'Basic'} size="sm" />
                          </div>
                        )}
                        <span className="font-medium">Olá, {firstName}</span>
                        <svg className="w-5 h-5 text-gray-300 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Menu dropdown que aparece no hover */}
                      <div className="absolute right-0 w-72 mt-2 pt-2 z-[100] pointer-events-none group-hover:pointer-events-auto">
                        <div className="transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top">
                          <div className="py-2 bg-dark-800/95 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-white/10 border border-white/5">
                            {/* Header do Menu */}
                            <div className="px-5 py-4 border-b border-white/5">
                              <p className="text-sm text-gray-400 mb-1">Logado como</p>
                              <p className="text-sm font-medium text-white truncate">{user.email}</p>
                              {subscription?.status === 'active' && (
                                <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent-purple/20 text-accent-pink border border-accent-purple/20">
                                  Plano {subscription.plan}
                                </div>
                              )}
                            </div>
                            
                            {/* Links Principais */}
                            <div className="py-2 px-2">
                              <Link
                                href="/profile/account"
                                className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                              >
                                <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Minha Conta</span>
                              </Link>
                              
                              <Link
                                href="/profile"
                                className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                              >
                                <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>Meu Perfil</span>
                              </Link>
                              
                              <Link
                                href="/profile/subscription"
                                className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                              >
                                <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                <span>Assinatura</span>
                              </Link>
                            </div>
                            
                            {/* Links Secundários */}
                            <div className="py-2 px-2 border-t border-white/5">
                              <Link
                                href="/events"
                                className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                              >
                                <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Eventos</span>
                              </Link>
                              
                              <Link
                                href="/promoters"
                                className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                              >
                                <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>Promoters</span>
                              </Link>
                            </div>
                            
                            {/* Logout */}
                            <div className="py-2 px-2 border-t border-white/5">
                              <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/5 transition-colors duration-200"
                              >
                                <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Sair da Conta</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-4 mr-6">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                         className="text-gray-400 hover:text-accent-pink transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                         className="text-gray-400 hover:text-accent-pink transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                         className="text-gray-400 hover:text-accent-pink transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                      <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" 
                         className="text-gray-400 hover:text-accent-pink transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </a>
                    </div>
                    <Link
                      href="/login"
                      className="text-gray-300 hover:text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200"
                    >
                      Entrar
                    </Link>
                    <Link
                      href="/register"
                      className="text-white text-sm font-medium px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-pink hover:to-accent-purple transition-all duration-300 shadow-lg hover:shadow-accent-purple/20"
                    >
                      Registrar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-16">{children}</main>
      </div>
    </>
  );
}
