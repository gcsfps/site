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
      
      // Faz o signOut do NextAuth
      await signOut({
        redirect: false,
        callbackUrl: '/login'
      });

      // Espera um pouco mais antes de redirecionar
      setTimeout(() => {
        window.location.replace('/login');
      }, 500);

    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Em caso de erro, força um reload
      window.location.replace('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
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
