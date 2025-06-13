import { ProtectedRoute } from '@/components/ProtectedRoute';
import Home from '@/screens/home';

export default function HomePage(){

  return (
    <ProtectedRoute>
      <Home/>
     </ProtectedRoute>
  );
}