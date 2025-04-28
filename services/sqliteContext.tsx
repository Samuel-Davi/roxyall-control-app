import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite'; 
import { Fallback } from '@/components/Fallback';
import Toast from 'react-native-toast-message';
import { hashPassword } from '@/utils/utils';
import { User } from '@/types/User';
import { Transaction } from '@/types/Transaction';

type SQLiteDatabase = SQLite.SQLiteDatabase | null;

export const SQLiteContext = createContext<SQLiteDatabase>(null);

interface SQLiteProviderProps {
  databaseName: string;
  children: ReactNode;
  useSuspense?: boolean;
}

export async function getUsersData(db:SQLiteDatabase){
  try{
    if(db){
      const data:User[] = await db.getAllAsync(`
        select * from users
      `)
      return data
    }
  }catch(error){
    console.log(error)
  }
}

export async function getTransactionsData(db:SQLiteDatabase){
  try{
    if(db){
      const data:Transaction[] = await db.getAllAsync(`
        select * from transactions
      `)
      return data
    }
  }catch(error){
    console.log(error)
  }
}

export async function addTransacionsOnBD(transaction:Transaction, user:User | null, db:SQLiteDatabase){
  try{
    if(db && user){
      const amount = transaction.category.startsWith("Renda") ? transaction.amount : transaction.amount*-1
      await db.runAsync(`
        insert into transactions (id, user_id, description, amount, date, category) values (null, ?, ?, ?, ?, ?);
      `, user.id, transaction.description, amount, transaction.date, transaction.category)
    }
  }catch(error){
    console.log(error)
  }
}

export async function getTransactionsFromBD(user:User|null, db:SQLiteDatabase){
  try{
    if(db && user){
      const transactions:Transaction[] = await db?.getAllAsync(`
        select * from transactions where user_id == ?
      `, user.id)
      return transactions
    }
  }catch(error){
    console.log(error)
  }
}

export async function getSaldoFromBD(user:User|null, db: SQLiteDatabase){
  try{
    if(db && user){
      const transactions:Transaction[] = await db?.getAllAsync(`
        select * from transactions where user_id == ?
      `, user.id)
      transactions.map(item => {
        if(!item.category.startsWith("Renda") && item.amount > 0){
          item.amount *= -1
        }
      })
      const arrayRenda = transactions.filter(item => item.category.startsWith("Renda"))
      const arrayGastos = transactions.filter(item => !item.category.startsWith("Renda"))
      const gastos = arrayGastos.reduce((acc, item) => acc + item.amount, 0)
      const renda = arrayRenda.reduce((acc, item) => acc + item.amount, 0)
      return renda + gastos
    }
  }catch(error){
    console.log(error)
  }
}

export async function cadastroUsuario(user:User, db:SQLiteDatabase){
  try{
    if(db && user && user.password){
      const senhaHasheada = await hashPassword(user.password)
      await db.runAsync(`
        insert into users (id, name, password, email, avatar) values (null, ?, ?, ?, '');
      `, user.name, senhaHasheada, user.email)
      return true
    }
  }catch(error){
    console.log(error)
    return false
  }
}

export async function verificaLogin(email: string, password: string, db:SQLiteDatabase){
  try{
      if(db){
        const senhaHasheada = await hashPassword(password)
        const user:User | null = await db?.getFirstAsync('SELECT * FROM users WHERE email == ? AND password == ?', 
          email, senhaHasheada
        )
        if(user){
          Toast.show({
            type: 'success',
            text1: 'Bem vindo(a) ' + user.name
          })
          return user
        }else{
          Toast.show({
            type: 'error',
            text1: 'Email ou senha errados'
          })
          return null
        }
      }else{
        console.log('sem db')
        return null
      }
      
    }catch(error){
      console.log(error)
      return false
    }
}

export const SQLiteProvider: React.FC<SQLiteProviderProps> = ({ databaseName, children, useSuspense = false }) => {
  const [db, setDb] = useState<SQLiteDatabase>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initializeDatabase() {
      try {
        const database = await SQLite.openDatabaseAsync(databaseName);
        setDb(database)

        // Executar a criação de tabelas aqui
        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT UNIQUE NOT NULL,
              password TEXT NOT NULL,
              avatar TEXT
            );`
        );

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS transactions (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              description TEXT,
              amount REAL,
              date TEXT,
              category TEXT,
              FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);

        console.log('Banco de dados inicializado e tabelas criadas!');
        setLoading(false);
      } catch (err: any) {
        console.error('Erro ao inicializar o banco de dados:', err);
        setError(err);
        setLoading(false);
      }
    }

    initializeDatabase();
  }, [databaseName]);

  const value = db;

  if (useSuspense && loading) {
    throw new Promise(() => {});
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 16, color: 'red', textAlign: 'center' }}>
          Erro ao inicializar o banco de dados: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <SQLiteContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <Fallback/>
      )}
    </SQLiteContext.Provider>
  );
};