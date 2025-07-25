// src/interfaces/controllers/WalletController.ts

import { Request, Response } from "express";
import { TransactionHistory } from "../../application/usecases/admin/TransactionHistory";
import { GetWalletBalance } from "../../application/usecases/admin/Wallet";


export class WalletController {
  constructor(
    private readonly transactionHistory: TransactionHistory,
    private getWalletBalance: GetWalletBalance
   
  ) {}

  async getAdminTransactions(req: Request, res: Response) {
    try {
      const transactions = await this.transactionHistory.execute();
      res.status(200).json({ success: true, transactions });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch transactions" });
    }
  }

   async getAdminBalance(req: Request, res: Response): Promise<void> {
    try {
      const balance = await this.getWalletBalance.execute();
      res.status(200).json({ balance });
    } catch (error) {
      console.error("Error fetching admin balance:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
