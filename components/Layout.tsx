import { useState, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { useUserPermissions } from '../src/hooks/useUserPermissions';
import PlanIcon from './PlanIcon';
import { Menu, Transition } from '@headlessui/react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isPromoter, isVip } = useUserPermissions();

  // Pega o primeiro nome do usuário
  const firstName = user?.name?.split(' ')[0] || '';

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Barra de Navegação */}
      <nav className="bg-dark-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo e Links Principais */}
            <div className="flex">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold gradient-text">Agenda VIP</span>
              </Link>
              
              <div className="ml-10 flex items-center space-x-4">
                <Link href="/events" className="nav-link">
                  Eventos
                </Link>
                <Link href="/promoters" className="nav-link">
                  Promoters
                </Link>
                <Link href="/about" className="nav-link">
                  Sobre
                </Link>
              </div>
            </div>

            {/* Menu do Usuário */}
            <div className="flex items-center space-x-4">
              {user ? (
                <Menu as="div" className="relative">
                  {/* Botão do Menu */}
                  <Menu.Button className="flex items-center space-x-3 text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 hover:from-accent-purple/30 hover:to-accent-pink/30 transition-all duration-200">
                    <span className="text-sm font-medium">Olá, {firstName}</span>
                    <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Menu.Button>

                  {/* Menu Dropdown */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-64 mt-2 origin-top-right bg-dark-800/95 backdrop-blur-xl rounded-xl shadow-lg ring-1 ring-black/5 focus:outline-none divide-y divide-gray-700/50 z-50">
                      {/* Cabeçalho com Informações do Usuário */}
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-400">Logado como</p>
                        <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                        {user?.type && (
                          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-purple/20 text-accent-pink border border-accent-purple/20">
                            {user.type === 'promoter' ? 'Promoter' : 'VIP'}
                          </span>
                        )}
                      </div>

                      {/* Menu Principal */}
                      <div className="py-2">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/dashboard"
                              className={`flex items-center px-4 py-2.5 text-sm ${
                                active ? 'bg-white/5 text-white' : 'text-gray-300'
                              }`}
                            >
                              <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={`flex items-center px-4 py-2.5 text-sm ${
                                active ? 'bg-white/5 text-white' : 'text-gray-300'
                              }`}
                            >
                              <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Meu Perfil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/account"
                              className={`flex items-center px-4 py-2.5 text-sm ${
                                active ? 'bg-white/5 text-white' : 'text-gray-300'
                              }`}
                            >
                              <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Minha Conta
                            </Link>
                          )}
                        </Menu.Item>
                      </div>

                      {/* Menu Específico por Tipo de Usuário */}
                      {isPromoter && (
                        <div className="py-2">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/subscription"
                                className={`flex items-center px-4 py-2.5 text-sm ${
                                  active ? 'bg-white/5 text-white' : 'text-gray-300'
                                }`}
                              >
                                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                Minha Assinatura
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/events/create"
                                className={`flex items-center px-4 py-2.5 text-sm ${
                                  active ? 'bg-white/5 text-white' : 'text-gray-300'
                                }`}
                              >
                                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                </svg>
                                Criar Evento
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/analytics"
                                className={`flex items-center px-4 py-2.5 text-sm ${
                                  active ? 'bg-white/5 text-white' : 'text-gray-300'
                                }`}
                              >
                                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Analytics
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      )}

                      {isVip && (
                        <div className="py-2">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/events/my-applications"
                                className={`flex items-center px-4 py-2.5 text-sm ${
                                  active ? 'bg-white/5 text-white' : 'text-gray-300'
                                }`}
                              >
                                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                Minhas Inscrições
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/favorites"
                                className={`flex items-center px-4 py-2.5 text-sm ${
                                  active ? 'bg-white/5 text-white' : 'text-gray-300'
                                }`}
                              >
                                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Favoritos
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      )}

                      {/* Configurações e Suporte */}
                      <div className="py-2">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/settings"
                              className={`flex items-center px-4 py-2.5 text-sm ${
                                active ? 'bg-white/5 text-white' : 'text-gray-300'
                              }`}
                            >
                              <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Configurações
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/support"
                              className={`flex items-center px-4 py-2.5 text-sm ${
                                active ? 'bg-white/5 text-white' : 'text-gray-300'
                              }`}
                            >
                              <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Suporte
                            </Link>
                          )}
                        </Menu.Item>
                      </div>

                      {/* Botão de Logout */}
                      <div className="py-2">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`flex w-full items-center px-4 py-2.5 text-sm ${
                                active ? 'bg-white/5 text-red-300' : 'text-red-400'
                              }`}
                            >
                              <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Sair
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/register"
                    className="text-white px-4 py-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-pink hover:to-accent-purple transition-all duration-300"
                  >
                    Registrar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main>{children}</main>

      {/* Rodapé */}
      <footer className="bg-dark-800 border-t border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-gray-400">
            {new Date().getFullYear()} Agenda VIP. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
