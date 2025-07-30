export interface WalletRepository {
 getAdminWallet(): Promise<any>;
  createAdminWallet(): Promise<any>;
  incrementAdminBalance(amount: number): Promise<void>;
  getAdminBalance(): Promise<number>;
   deductFromAdminWallet(amount: number): Promise<void>;
  creditToUserWallet(userId: string, amount: number): Promise<void>;
}
