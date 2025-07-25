// src/infrastructure/database/repositories/WalletRepositoryImpl.ts

import { WalletRepository } from "../../domain/repositories/WalletRepository";
import WalletModel from "../models/Wallet";

export class WalletRepositoryImpl implements WalletRepository {
  async getAdminWallet(): Promise<any> {
    return WalletModel.findOne({ owner: "admin" });
  }

  async createAdminWallet(): Promise<any> {
    return WalletModel.create({ owner: "admin", balance: 0 });
  }

  async incrementAdminBalance(amount: number): Promise<void> {
    await WalletModel.findOneAndUpdate(
      { owner: "admin" },
      { $inc: { balance: amount } },
      { upsert: true }
    );
  }

  async getAdminBalance(): Promise<number> {
    const wallet = await WalletModel.findOne({ owner: "admin" });
    return wallet?.balance ?? 0;
  }
}
