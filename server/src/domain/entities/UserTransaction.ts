// src/domain/entities/Transaction.ts
export interface Transaction {
  id?: string;
  userId: string;
  type: "refund" | "payment";
  amount: number;
  description: string;
  appointmentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
