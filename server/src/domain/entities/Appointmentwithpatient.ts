import { IUser } from "./User";

export interface AppointmentWithPatient {
  _id: string;
  doctor: string;
  patientDetails: IUser;
  date: string;
  start: string;
  end: string;
  reason?: string;
  status: "booked" | "confirmed" | "completed" | "cancelled"; // ← updated here
  createdAt?: Date;
}
