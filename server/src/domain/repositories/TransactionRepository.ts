export interface TransactionRepository {
  // Create a new transaction (e.g., when payment is made)
  createTransaction(data: {
    fromUser: string;
    amount: number;
    appointmentId: string;
  }): Promise<void>;

  // Get all transactions for the admin (you can also later add pagination)
  getAdminTransactions(): Promise<{
    _id: string;
    fromUser: string;
    amount: number;
    appointmentId: string;
    date: Date;
  }[]>;


}
