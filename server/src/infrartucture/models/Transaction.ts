// models/Transaction.ts

import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  fromUser: mongoose.Types.ObjectId | "admin";
  to: mongoose.Types.ObjectId | "admin";
  amount: number;
  appointmentId: mongoose.Types.ObjectId;
  date: Date;
}

const TransactionSchema: Schema = new Schema({
  fromUser: {
    type: mongoose.Schema.Types.Mixed, // can be "admin" or ObjectId
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.Mixed, // can be "admin" or ObjectId
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
});


export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
