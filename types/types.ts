export type Transaction = {
    id: number;
    description: string;
    amount: number;
    date: string;
    category: string;
};
  
export type User = {
    id: number;
    name: string;
    password?: string;
    avatar: string;
}