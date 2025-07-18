import { Types } from "mongoose";

export interface ISlotTime {
  start: string;
  end: string;
  booked?: boolean; // Optional, used in the frontend response
}

export interface ISlot {
  _id?: string;
  doctor: Types.ObjectId;
  day: string;        // e.g. "Monday"
  date: string;       // ✅ e.g. "2025-07-15"
  slots: ISlotTime[];
}
