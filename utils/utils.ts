

//mockData
export const userMockData:User[] = [
  {
    id: 1,
    name: "Samuel",
    password: "samuellima",
    avatar: ''
  },
]

export const banksNames = ["Nubank", "Inter", "Picpay"] as const

export const accountNames = [...banksNames, "Carteira"] as const

export const cardNames = [...banksNames, "Outros"] as const

type AccountName = typeof accountNames[number];
type CardName = typeof cardNames[number];

export type TypeContasMockDatas = {
  id:number;
  id_user:number;
  nome: AccountName;
  saldo: number
}

export type TypeCardMockDatas = {
  id: number;
  id_user:number;
  nome: CardName;
  limite: number;
  faturaAtual:number;
  limiteDisponivel: number;
}

export const contasMockData:TypeContasMockDatas[] = [
  {
    id: 1 ,
    id_user: 1,
    nome: 'Nubank',
    saldo: 122
  },{
    id: 2,
    id_user: 1,
    nome: 'Inter',
    saldo: 200
  }
]

export const cardsMockData:TypeCardMockDatas[] = [
  {
    id: 1,
    id_user: 1,
    nome: 'Nubank',
    limite: 260,
    faturaAtual: 200,
    limiteDisponivel: 60
  }
]

export const totalByCategory = (category: string, data:Transaction[]) => {
    data.map(item => {
      if(!item.category.startsWith("Renda") && item.amount > 0){
        item.amount *= -1
      }
    })
  
    const total = data
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + item.amount, 0);
  
    return total;
};

import { Transaction, User } from '@/types/types';
import * as Crypto from 'expo-crypto'

export async function hashPassword(password: string): Promise<string> {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return digest;
}

export const bankLogos = {
  Nubank: require("@/assets/images/banks/nubank.png"),
  Inter: require("@/assets/images/banks/inter.png"),
  Picpay: require("@/assets/images/banks/picpay.png"),
  Carteira: require("@/assets/images/banks/credit-card.png"),
  Outros: require("@/assets/images/banks/credit-card.png")
}