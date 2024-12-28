import React, { createContext, useContext } from 'react';
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

  const logout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const user = session?.user ? {
    id: session.user.id as string,
    email: session.user.email as string,
    name: session.user.name as string,
    type: session.user.type as string,
    establishmentName: session.user.establishmentName,
    phone: session.user.phone,
    description: session.user.description,
    profileImage: session.user.profileImage,
    coverImage: session.user.coverImage,
    address: session.user.address,
    openingHours: session.user.openingHours,
    socialMedia: session.user.socialMedia,
  } : null;

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
