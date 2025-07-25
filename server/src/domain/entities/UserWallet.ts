// src/domain/entities/Wallet.ts
export interface Wallet {
  id?: string;
  userId: string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}
