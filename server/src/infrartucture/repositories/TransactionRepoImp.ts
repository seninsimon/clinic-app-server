
import { TransactionRepository } from "../../domain/repositories/TransactionRepository";
import mongoose from "mongoose";
import TransactionModel from "../models/Transaction";
import UserTransaction from "../models/UserTransaction";
import { UserModel } from "../models/UserModel";

export class TransactionRepositoryImpl implements TransactionRepository {
  async createTransaction(data: {
    fromUser: string;
    amount: number;
    appointmentId: string;
  }): Promise<void> {
    const { fromUser, amount, appointmentId } = data;

    await TransactionModel.create({
      fromUser: new mongoose.Types.ObjectId(fromUser),
      to: "admin", // 👈 add this to track admin income
      amount,
      appointmentId: new mongoose.Types.ObjectId(appointmentId),
    });

    await UserTransaction.create({
      userId: fromUser,
      appointmentId,
      amount,
      type: "payment",
    });
  }

  async getAdminTransactions(): Promise<
  {
    _id: string;
    fromUser: string;
    amount: number;
    appointmentId: string;
    date: Date;
    type: "credit" | "debit";
  }[]
> {
  const transactions = await TransactionModel.find({
    $or: [{ to: "admin" }, { fromUser: "admin" }],
  })
    .select("_id fromUser to amount appointmentId date")
    .lean();

  return await Promise.all(
    transactions.map(async (txn: any) => {
      let fromUserDisplay = "Unknown";
      let type: "credit" | "debit" = "credit";

      // Determine if this is a debit or credit for admin
      if (txn.to === "admin") {
        type = "credit"; // money credited to admin
      } else if (txn.fromUser === "admin") {
        type = "debit"; // money debited from admin
      }

      // Set display name
      if (txn.fromUser === "admin") {
        fromUserDisplay = "Admin";
      } else if (mongoose.isValidObjectId(txn.fromUser)) {
        const user = await UserModel.findById(txn.fromUser)
          .select("name email")
          .lean();
        if (user) {
          fromUserDisplay = `${user.name} (${user.email})`;
        }
      }

      return {
        _id: txn._id.toString(),
        fromUser: fromUserDisplay,
        amount: txn.amount,
        appointmentId: txn.appointmentId?.toString() ?? "N/A",
        date: txn.date,
        type,
      };
    })
  );
}


  async createRefundTransaction(userId: string, appointmentId: string, amount: number): Promise<void> {
    // 1. Log main transaction (admin → user)
    await TransactionModel.create({
      fromUser: "admin",
      to: new mongoose.Types.ObjectId(userId),
      amount,
      appointmentId: new mongoose.Types.ObjectId(appointmentId),
    });

    // 2. Log user-level transaction
    await UserTransaction.create({
      userId,
      appointmentId,
      amount,
      type: "refund",
    });
  }
}

