import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// Função para limpar cookies no servidor
const clearServerCookies = (res: any) => {
  const cookiesToClear = [
    'next-auth.session-token',
    'next-auth.csrf-token',
    'next-auth.callback-url',
    '__Secure-next-auth.session-token',
    '__Secure-next-auth.callback-url',
    '__Host-next-auth.csrf-token'
  ];

  cookiesToClear.forEach(cookieName => {
    const cookieOptions = [
      `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly`,
      `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`,
      `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=${process.env.NEXTAUTH_URL}; HttpOnly; SameSite=Strict`,
      `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=${process.env.NEXTAUTH_URL}; HttpOnly; Secure; SameSite=Strict`
    ];
    res.setHeader('Set-Cookie', cookieOptions);
  });
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Primeiro verifica a sessão
    const session = await getSession(context);

    // Se houver uma sessão, redireciona para o perfil
    if (session) {
      return {
        redirect: {
          destination: '/profile',
          permanent: false,
        },
      };
    }

    // Se não houver sessão, limpa os cookies por precaução
    clearServerCookies(context.res);

    return {
      props: {},
    };
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    clearServerCookies(context.res);
    return {
      props: {},
    };
  }
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Email ou senha incorretos');
        setLoading(false);
        return;
      }

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Espera um pouco antes de redirecionar
      setTimeout(() => {
        window.location.replace('/profile');
      }, 500);
      
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="glass-card p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
              <span className="gradient-text">Login</span>
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
                {error}
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
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-accent-purple focus:ring-accent-pink border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-gray-300">
                    Lembrar-me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-accent-purple hover:text-accent-pink">
                  Esqueceu a senha?
                </Link>
              </div>

              <button 
                type="submit" 
                className="btn-primary w-full"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

              <div className="text-center text-gray-400">
                Não tem uma conta?{' '}
                <Link href="/register" className="text-accent-purple hover:text-accent-pink">
                  Registre-se
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
