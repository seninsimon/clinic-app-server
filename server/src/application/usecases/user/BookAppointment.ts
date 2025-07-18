// src/application/usecases/appointment/BookAppointment.ts

import { AppointmentRepository } from "../../../domain/repositories/AppointmetRepository";
import { IAppointment } from "../../../domain/entities/Appointment";
import { toZonedTime } from "date-fns-tz";

export class BookAppointment {
  constructor(
    private readonly appointmentRepo: AppointmentRepository
  ) {}

  async execute(appointmentData: IAppointment): Promise<IAppointment> {
    const { doctor, date, start, end } = appointmentData;

    const isBooked = await this.appointmentRepo.isSlotBooked(
      doctor.toString(),
      date,
      start,
      end
    );

    if (isBooked) {
      throw new Error("Slot already booked. Please choose another.");
    }

    const appointment = await this.appointmentRepo.book(appointmentData);
    return appointment;
  }
}
