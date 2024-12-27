import Layout from '../components/Layout';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de recuperação de senha aqui
    console.log('Reset password for:', email);
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="glass-card p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
              <span className="gradient-text">Recuperar Senha</span>
            </h1>

            {!submitted ? (
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

                <button type="submit" className="btn-primary w-full">
                  Enviar Link de Recuperação
                </button>

                <div className="text-center text-gray-400">
                  Lembrou sua senha?{' '}
                  <Link href="/login" className="text-accent-purple hover:text-accent-pink">
                    Voltar ao login
                  </Link>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-green-400 mb-4">
                  ✓ Email de recuperação enviado!
                </div>
                <p className="text-gray-300">
                  Enviamos um link de recuperação para {email}.<br />
                  Verifique sua caixa de entrada.
                </p>
                <Link href="/login" className="btn-secondary inline-block mt-4">
                  Voltar ao Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
