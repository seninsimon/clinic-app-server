// src/application/usecases/user/CancelAppointment.ts

import { AppointmentRepository } from "../../../domain/repositories/AppointmetRepository";

export class CancelAppointment {
  constructor(private appointmentRepo: AppointmentRepository) {}

  async execute(appointmentId: string): Promise<boolean> {
    return await this.appointmentRepo.cancelAppointment(appointmentId);
  }
}
