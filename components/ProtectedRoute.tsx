import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) {
      // Se não estiver logado, manda para login
      router.replace('/');
    }
  }, [user]);

  if (!user?.id) {
    // Enquanto redireciona, não renderiza nada
    return null;
  }

  return <>{children}</>;
}
