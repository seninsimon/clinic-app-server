import { Types } from "mongoose";

export interface IAppointment {
  _id?: string;
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  date: string; // Format: "YYYY-MM-DD"
  start: string; // Format: "HH:mm"
  end: string;   // Format: "HH:mm"
  reason?: string;
  status?: "booked" | "cancelled"; // Default: "booked"
  createdAt?: Date;
}
