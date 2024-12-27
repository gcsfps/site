import Layout from '../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de login aqui
    console.log('Login:', { email, password });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="glass-card p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
              <span className="gradient-text">Login</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-300">
                  <input type="checkbox" className="mr-2" />
                  Lembrar-me
                </label>
                <Link href="/forgot-password" className="text-accent-purple hover:text-accent-pink">
                  Esqueceu a senha?
                </Link>
              </div>

              <button type="submit" className="btn-primary w-full">
                Entrar
              </button>

              <div className="text-center text-gray-400">
                Não tem uma conta?{' '}
                <Link href="/register" className="text-accent-purple hover:text-accent-pink">
                  Cadastre-se
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
