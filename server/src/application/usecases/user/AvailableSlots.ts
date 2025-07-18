// src/application/usecases/user/AvailableSlots.ts

import { SlotRepository } from "../../../domain/repositories/SlotRepository";
import { AppointmentRepository } from "../../../domain/repositories/AppointmetRepository";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

interface SlotDTO {
  start: string;
  end: string;
  booked: boolean;
}

export class AvailableSlots {
  constructor(
    private slotRepo: SlotRepository,
    private appointmentRepo: AppointmentRepository
  ) {}

  async execute(doctorId: string, date: string): Promise<SlotDTO[]> {
    if (!doctorId || !date) {
      throw new Error("Doctor ID and date are required");
    }

    // ✅ Use correct timezone
    const timeZone = "Asia/Kolkata";

    // Convert the date to a Date object and adjust for timezone
    const utcDate = new Date(date + "T00:00:00Z"); // safe parsing from frontend
    const zonedDate = toZonedTime(utcDate, timeZone);

    const dayName = format(zonedDate, "EEEE"); // Monday, Tuesday, etc.
    console.log("Day for given date in IST:", dayName);

    // Fetch slots for that weekday
    const slotData = await this.slotRepo.getSlotByDay(doctorId, dayName);
    if (!slotData || slotData.slots.length === 0) {
      return [];
    }

    // Fetch all booked appointments for the date
    const appointments = await this.appointmentRepo.getAppointmentsByDoctorAndDate(doctorId, date);
    const bookedSet = new Set(appointments.map(a => `${a.start}-${a.end}`));

    // Mark which slots are booked
    return slotData.slots.map(slot => ({
      start: slot.start,
      end: slot.end,
      booked: bookedSet.has(`${slot.start}-${slot.end}`),
    }));
  }
}
