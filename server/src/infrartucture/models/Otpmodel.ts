import { IOtp } from "../../domain/entities/Otp";
import mongoose, { Schema  } from 'mongoose';


const otpSchema: Schema<IOtp> = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 
  }
});

export const OtpModel = mongoose.model<IOtp>('Otp', otpSchema);