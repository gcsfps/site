import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

interface User {
  id: string;
  email: string;
  type: string;
  name: string;
  establishmentName?: string;
  phone?: string;
  description?: string;
  profileImage?: string;
  coverImage?: string;
  address?: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
  };
  openingHours?: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
  subscription?: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/profile/${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser({
            ...data,
            id: session.user.id,
            email: session.user.email,
          });
        })
        .catch(console.error);
    } else {
      setUser(null);
    }
  }, [session]);

  const logout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: status === 'authenticated',
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
