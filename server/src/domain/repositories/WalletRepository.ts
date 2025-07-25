export interface WalletRepository {
 getAdminWallet(): Promise<any>;
  createAdminWallet(): Promise<any>;
  incrementAdminBalance(amount: number): Promise<void>;
  getAdminBalance(): Promise<number>;
}
