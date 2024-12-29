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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: '/profile',
      });

      if (result?.error) {
        setError('Email ou senha incorretos');
      } else {
        if (rememberMe) {
          // Salva as credenciais no localStorage
          localStorage.setItem('rememberedEmail', email);
        } else {
          // Remove as credenciais do localStorage
          localStorage.removeItem('rememberedEmail');
        }
        router.push('/profile');
      }
    } catch (error) {
      setError('Ocorreu um erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  // Carrega o email salvo quando o componente é montado
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>

            <div className="text-center">
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Não tem uma conta? Registre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
