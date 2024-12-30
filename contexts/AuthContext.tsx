import { createContext, useContext, useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
  type: string;
  establishmentName?: string;
  phone?: string;
  description?: string;
  profileImage?: string;
  coverImage?: string;
  address?: string;
  openingHours?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

interface AuthContextData {
  user: User | null;
  logout: () => Promise<void>;
  register: (email: string, password: string, type: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as User);
    } else {
      setUser(null);
    }
  }, [session]);

  const clearAllCookies = () => {
    const cookies = document.cookie.split(';');
    const domain = window.location.hostname;
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      // Remove o cookie com diferentes combinações de atributos
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}; secure`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}; secure; samesite=strict`;
      
      // Tenta limpar também com prefixos de segurança
      document.cookie = `__Secure-${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure`;
      document.cookie = `__Host-${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure`;
    }

    // Limpa storages
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error('Erro ao limpar storage:', e);
    }
  };

  const logout = async () => {
    try {
      // Limpa o estado do usuário
      setUser(null);
      
      // Limpa todos os cookies e storage
      clearAllCookies();
      
      // Chama a API de force-logout
      await fetch('/api/auth/force-logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      // Força redirecionamento
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Em caso de erro, força um reload
      window.location.href = '/login';
    }
  };

  const setInitialSubscription = async (userId: string, isTestPromoter = false) => {
    try {
      const subscriptionData = {
        userId,
        plan: isTestPromoter ? 'ultimate' : 'basic',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + (isTestPromoter ? 365 : 30) * 24 * 60 * 60 * 1000), // 1 ano ou 1 mês
      };

      await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });
    } catch (error) {
      console.error('Erro ao configurar assinatura:', error);
    }
  };

  const register = async (email: string, password: string, type: string = 'vip') => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, type }),
      });

      const data = await response.json();

      if (response.ok) {
        // Se for promoter, configura assinatura inicial
        if (type === 'promoter') {
          await setInitialSubscription(data.user.id, email === 'promoter@teste.com');
        }
        
        await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        router.push('/dashboard');
      } else {
        throw new Error(data.message || 'Erro ao registrar');
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
