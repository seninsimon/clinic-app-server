// models/Transaction.ts

import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  fromUser: mongoose.Types.ObjectId;
  amount: number;
  appointmentId: mongoose.Types.ObjectId;
  date: Date;
  to: "admin"; // 👈 Add this
}

const TransactionSchema: Schema = new Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  to: {
    type: String,
    enum: ["admin"], // Only admin for now
    default: "admin",
  },
});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
