import { Schema, model } from "mongoose";
import { IAppointment } from "../../domain/entities/Appointment";

const AppointmentSchema = new Schema<IAppointment>(
  {
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    reason: { type: String, required: false }, // <-- Add this
     fee: { type: Number, required: true }, // ✅ ADD THIS LINE
    status: {
      type: String,
      enum: ["booked", "confirmed", "completed", "cancelled"], // ← updated here
      default: "booked",
    },
  },
  { timestamps: true }
);

export const AppointmentModel = model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
