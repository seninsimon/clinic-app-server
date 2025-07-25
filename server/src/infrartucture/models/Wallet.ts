// models/Wallet.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IWallet extends Document {
  owner: "admin";
  balance: number;
}

const WalletSchema: Schema = new Schema({
  owner: { type: String, enum: ["admin"], default: "admin", unique: true },
  balance: { type: Number, default: 0 },
});

export default mongoose.model<IWallet>("Wallet", WalletSchema);
