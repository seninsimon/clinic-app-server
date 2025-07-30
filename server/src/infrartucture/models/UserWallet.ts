// src/infrastructure/database/models/UserWallet.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUserWallet extends Document {
  userId: mongoose.Types.ObjectId;
  balance: number;
}

const UserWalletSchema = new Schema<IUserWallet>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  balance: { type: Number, default: 0 },
});

export default mongoose.model<IUserWallet>("UserWallet", UserWalletSchema);
