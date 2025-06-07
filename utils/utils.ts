import { Transaction } from "../types/Transaction";

//mockData
export const userMockData = [
  {
    id: 1,
    name: "Samuel",
    password: "samuellima",
    saldoTotal: 0,
    faturaTotal: 0,
    // avatar: ''  a colocar no bd
  },
]

export const banksNames = ["Nubank", "Inter", "Picpay"] as const

export const accountNames = [...banksNames, "Carteira"] as const

export const cardNames = [...banksNames, "Outros"] as const

type AccountName = typeof accountNames[number];
type CardName = typeof cardNames[number];

type TypeContasMockDatas = {
  id_user:number;
  nome: AccountName;
  saldo: number
}

type TypeCardMockDatas = {
  id_user:number;
  nome: CardName;
  limite: number;
  faturaAtual:number;
  limiteDisponivel: number;
}

export const contasMockData:TypeContasMockDatas[] = [
  {
    id_user: 1,
    nome: 'Nubank',
    saldo: 120
  }
]

export const cardsMockData:TypeCardMockDatas[] = [
  {
    id_user: 1,
    nome: 'Nubank',
    limite: 260,
    faturaAtual: 85,
    limiteDisponivel: 175
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