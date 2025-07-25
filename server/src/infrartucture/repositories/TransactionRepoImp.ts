// src/infrastructure/database/repositories/TransactionRepositoryImpl.ts

import { TransactionRepository } from "../../domain/repositories/TransactionRepository";
import mongoose from "mongoose";
import TransactionModel from "../models/Transaction";

export class TransactionRepositoryImpl implements TransactionRepository {
  async createTransaction(data: {
    fromUser: string;
    amount: number;
    appointmentId: string;
  }): Promise<void> {
    const { fromUser, amount, appointmentId } = data;

    await TransactionModel.create({
      fromUser: new mongoose.Types.ObjectId(fromUser),
      amount,
      appointmentId: new mongoose.Types.ObjectId(appointmentId),
    });
  }

  async getAllTransactions(): Promise<any[]> {
    return TransactionModel.find()
      .populate("fromUser", "name email")
      .populate("appointmentId")
      .sort({ date: -1 });
  }

  async getAdminTransactions(): Promise<
    {
      _id: string;
      fromUser: string;
      amount: number;
      appointmentId: string;
      date: Date;
    }[]
  > {
    const transactions = await TransactionModel.find({ to: "admin" })
      .select("_id fromUser amount appointmentId date")
      .populate({
        path: "fromUser",
        select: "name email",
      })
      .lean();

    return transactions.map((txn: any) => ({
      _id: txn._id.toString(),
      fromUser:
        txn.fromUser && typeof txn.fromUser === "object"
          ? `${txn.fromUser.name} (${txn.fromUser.email})`
          : "Unknown User",
      amount: txn.amount,
      appointmentId: txn.appointmentId?.toString() ?? "N/A",
      date: txn.date,
    }));
  }
}
