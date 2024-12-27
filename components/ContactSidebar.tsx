import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PhoneIcon, EnvelopeIcon, Bars3Icon, XMarkIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { WhatsappIcon } from './icons/WhatsappIcon';

interface ContactSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactSidebar({ isOpen, onClose }: ContactSidebarProps) {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-dark-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold gradient-text">Menu</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Links de Navegação */}
          <div className="space-y-4 mb-8">
            <Link
              href="/events"
              className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-200 ${
                isActive('/events') ? 'bg-accent-purple/20 text-accent-purple' : 'bg-dark-900 hover:bg-dark-700'
              }`}
            >
              <CalendarIcon className="h-6 w-6" />
              <span>Eventos</span>
            </Link>

            <Link
              href="/promoters"
              className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-200 ${
                isActive('/promoters') ? 'bg-accent-purple/20 text-accent-purple' : 'bg-dark-900 hover:bg-dark-700'
              }`}
            >
              <UserGroupIcon className="h-6 w-6" />
              <span>Promoters</span>
            </Link>

            <Link
              href="/login"
              className="flex items-center justify-center p-4 rounded-lg bg-accent-purple hover:bg-accent-pink transition-colors duration-200 text-white font-semibold"
            >
              <span>Login / Cadastro</span>
            </Link>
          </div>

          {/* Divisor */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-800 text-gray-400">Contato</span>
            </div>
          </div>

          {/* Lista de contatos */}
          <div className="space-y-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-4 rounded-lg bg-dark-900 hover:bg-dark-700 transition-colors duration-200"
            >
              <WhatsappIcon className="h-6 w-6 text-[#25D366]" />
              <div>
                <div className="font-semibold">WhatsApp</div>
                <div className="text-sm text-gray-400">Resposta em até 1 hora</div>
              </div>
            </a>

            {/* Telefone */}
            <a
              href="tel:+5511999999999"
              className="flex items-center space-x-4 p-4 rounded-lg bg-dark-900 hover:bg-dark-700 transition-colors duration-200"
            >
              <PhoneIcon className="h-6 w-6 text-accent-pink" />
              <div>
                <div className="font-semibold">Telefone</div>
                <div className="text-sm text-gray-400">(11) 99999-9999</div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:contato@agendavip.com"
              className="flex items-center space-x-4 p-4 rounded-lg bg-dark-900 hover:bg-dark-700 transition-colors duration-200"
            >
              <EnvelopeIcon className="h-6 w-6 text-accent-blue" />
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-sm text-gray-400">contato@agendavip.com</div>
              </div>
            </a>
          </div>

          {/* Horário de atendimento */}
          <div className="mt-auto">
            <div className="p-4 rounded-lg bg-dark-900">
              <h3 className="font-semibold mb-2">Horário de Atendimento</h3>
              <p className="text-sm text-gray-400">
                Segunda a Sexta: 9h às 18h<br />
                Sábado: 10h às 14h
              </p>
            </div>

            {/* Redes sociais */}
            <div className="mt-4 flex justify-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-accent-purple transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-accent-pink transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm5.2 12.3c-.2.4-.5.7-.9.9-1.2.6-6.5.6-6.5.6s-5.3 0-6.5-.6c-.4-.2-.7-.5-.9-.9-.6-1.2-.6-3.7-.6-3.7s0-2.5.6-3.7c.2-.4.5-.7.9-.9C4.5 5.4 9.8 5.4 9.8 5.4s5.3 0 6.5.6c.4.2.7.5.9.9.6 1.2.6 3.7.6 3.7s0 2.5-.6 3.7z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-accent-blue transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay de fundo */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
}
