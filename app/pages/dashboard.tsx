import { ProtectedRoute } from '@/components/ProtectedRoute';
import Dashboard from '@/screens/dashboard';

export default function DashboardPage(){


  return (
    <ProtectedRoute>
      <Dashboard/>
    </ProtectedRoute>
  );
};