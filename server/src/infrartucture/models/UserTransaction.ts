// src/infrastructure/database/models/UserTransaction.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUserTransaction extends Document {
  userId: mongoose.Types.ObjectId;
  appointmentId: mongoose.Types.ObjectId;
  amount: number;
  type: "refund" | "payment";
  date: Date;
}

const UserTransactionSchema = new Schema<IUserTransaction>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["refund", "payment"], required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IUserTransaction>("UserTransaction", UserTransactionSchema);
