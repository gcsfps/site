import { useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'vip', // 'vip' ou 'organizer'
    age: '',
    region: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/login?registered=true');
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao registrar');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Crie sua conta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Faça login
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-field mt-1"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field mt-1"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Tipo de conta
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="input-field mt-1"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="vip">Presença VIP</option>
                  <option value="organizer">Organizador de Eventos</option>
                </select>
              </div>

              {formData.type === 'vip' && (
                <>
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Idade
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      required
                      className="input-field mt-1"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Região
                    </label>
                    <input
                      id="region"
                      name="region"
                      type="text"
                      required
                      className="input-field mt-1"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field mt-1"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirme a senha
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="input-field mt-1"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button type="submit" className="btn-primary w-full">
                Criar conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
