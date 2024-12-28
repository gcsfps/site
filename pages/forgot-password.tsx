import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setEmail('');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Erro ao processar a solicitação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="glass-card p-8">
            <h1 className="text-3xl font-bold mb-8">
              <span className="gradient-text">Recuperar Senha</span>
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500">
                {message}
              </div>
            )}

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

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary"
              >
                {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-accent-purple hover:text-accent-purple-light"
                >
                  Voltar para o Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
