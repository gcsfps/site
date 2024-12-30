import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Redirecionar para o dashboard específico
    if (user.type === 'promoter') {
      router.push('/promoter/dashboard');
    } else if (user.type === 'vip') {
      router.push('/vip/dashboard');
    }
  }, [user, router]);

  return null; // Página de redirecionamento, não precisa de conteúdo
}
