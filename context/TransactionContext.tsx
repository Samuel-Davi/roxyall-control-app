import { Transaction } from '@/types/Transaction';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { getTransactionsFromBD, SQLiteContext } from '@/services/sqliteContext';

interface TransactionsContextData {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const {user} = useAuth()
  const db = useContext(SQLiteContext)

  const getTransactions = async () => {
    const result = await getTransactionsFromBD(user, db)
    if(result) setTransactions(result)
  }

  useEffect(() =>{
    getTransactions()
  }, [])

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);
