// src/application/usecases/transactions/TransactionHistory.ts

import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";

export class TransactionHistory {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  async execute() {
    const transactions = await this.transactionRepo.getAdminTransactions();
    return transactions;
  }
}
