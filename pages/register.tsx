import Layout from '../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'attendee'
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de registro aqui
    console.log('Register:', formData);
    router.push('/login');
  };

  const handleSocialLogin = (provider: string) => {
    // Implementar lógica de login social aqui
    console.log('Social login with:', provider);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="glass-card p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
              <span className="gradient-text">Criar Conta</span>
            </h1>

            {/* Botões de login social */}
            <div className="space-y-4 mb-8">
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg border border-gray-600 hover:border-gray-400 bg-dark-800 transition-colors duration-200"
              >
                <Image
                  src="/images/social/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span>Continuar com Google</span>
              </button>

              <button
                onClick={() => handleSocialLogin('facebook')}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg border border-gray-600 hover:border-gray-400 bg-dark-800 transition-colors duration-200"
              >
                <Image
                  src="/images/social/facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
                <span>Continuar com Facebook</span>
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-800 text-gray-400">Ou registre-se com email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label htmlFor="userType" className="block text-gray-300 mb-2">
                  Tipo de Conta
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="attendee">Participante VIP</option>
                  <option value="promoter">Promoter/Organizador</option>
                </select>
              </div>

              <button type="submit" className="btn-primary w-full">
                Criar Conta
              </button>

              <div className="text-center text-gray-400">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-accent-purple hover:text-accent-pink">
                  Faça login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
