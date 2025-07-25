// src/application/usecases/wallet/GetWalletBalance.ts

import { WalletRepository } from "../../../domain/repositories/WalletRepository";

export class GetWalletBalance {
  private walletRepository: WalletRepository;

  constructor(walletRepository: WalletRepository) {
    this.walletRepository = walletRepository;
  }

  async execute(): Promise<number> {
    const balance = await this.walletRepository.getAdminBalance();
    return balance;
  }
}
