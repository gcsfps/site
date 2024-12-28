import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon, CalendarIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ContactSidebar from './ContactSidebar';
import SubscriptionBadge from './SubscriptionBadge';
import { Menu, MenuButton, MenuItem, MenuItems, Transition, Fragment } from '@headlessui/react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const menuItems = user ? [
    ...(user.type === 'organizer' ? [
      { href: '/events/manage', label: 'Meus Eventos', icon: CalendarIcon },
    ] : [
      { href: '/events', label: 'Eventos', icon: CalendarIcon },
    ]),
    { href: '/profile', label: 'Meu Perfil', icon: UserIcon },
  ] : [];

  return (
    <div className="min-h-screen bg-dark-900">
      <nav className="bg-black border-b border-zinc-900 fixed w-full z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-14">
            <div className="flex items-center space-x-4">
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

              {/* Menu Desktop */}
              <div className="hidden md:flex items-center space-x-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                      router.pathname === item.href
                        ? 'bg-dark-800 text-white'
                        : 'text-gray-300 hover:bg-dark-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* User Info */}
              {user && (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-800 focus:ring-white">
                      <span className="sr-only">Abrir menu do usuário</span>
                      <SubscriptionBadge />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-dark-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile/account"
                            className={`${
                              active ? 'bg-dark-700' : ''
                            } block px-4 py-2 text-sm text-gray-300`}
                          >
                            Minha Conta
                          </Link>
                        )}
                      </Menu.Item>
                      {user?.subscription?.status === 'active' && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile/account#subscription"
                              className={`${
                                active ? 'bg-dark-700' : ''
                              } block px-4 py-2 text-sm text-gray-300`}
                            >
                              Minha Assinatura
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? 'bg-dark-700' : ''
                            } block w-full text-left px-4 py-2 text-sm text-gray-300`}
                          >
                            Sair
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
              {/* Login/Logout Button */}
              {!user && (
                <Link
                  href="/login"
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-dark-800 hover:text-white"
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  Entrar
                </Link>
              )}

              {/* Menu Sidebar Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-dark-800 hover:text-white"
                aria-label="Menu"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-dark-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                    router.pathname === item.href
                      ? 'bg-dark-800 text-white'
                      : 'text-gray-300 hover:bg-dark-800 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-14">
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

      <ContactSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
