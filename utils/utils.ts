import { Transaction } from "../types/Transaction";

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
  