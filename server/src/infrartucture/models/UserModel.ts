import mongoose, { Schema } from "mongoose";
import { IUser } from "../../domain/entities/User";

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for OAuth users
    phone: { type: String, default: null }, // Optional for OAuth users
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    role: {
      type: String,
      enum: ["admin", "patient", "doctor"],
      default: "patient",
    },
    googleIds: { type: String, default: null },
    isBlocked: { type: Boolean, default: false },
    googleVerified: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    profilePicture : {type : String , default : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
  },
  {
    timestamps: true,
  }
);

// Export like this for ES module compatibility
export const UserModel = mongoose.model<IUser>("User", userSchema);
