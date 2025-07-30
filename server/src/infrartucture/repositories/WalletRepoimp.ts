// src/infrastructure/database/repositories/WalletRepositoryImpl.ts

import { WalletRepository } from "../../domain/repositories/WalletRepository";
import UserWallet from "../models/UserWallet";
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

   async deductFromAdminWallet(amount: number): Promise<void> {
    const wallet = await WalletModel.findOne({ owner: "admin" });
    if (!wallet || wallet.balance < amount) {
      throw new Error("Insufficient admin balance");
    }
    wallet.balance -= amount;
    await wallet.save();
  }

  async creditToUserWallet(userId: string, amount: number): Promise<void> {
    let wallet = await UserWallet.findOne({ userId });

    if (!wallet) {
      wallet = new UserWallet({ userId, balance: 0 });
    }

    wallet.balance += amount;
    await wallet.save();
  }
}
