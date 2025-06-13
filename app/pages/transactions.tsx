import { ProtectedRoute } from '@/components/ProtectedRoute';
import Transactions from '@/screens/transacions';

export default function TransactionsPage() {

  return (
    <ProtectedRoute>
      <Transactions/>
    </ProtectedRoute>
  );
}
