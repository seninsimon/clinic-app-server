// src/application/usecases/user/GetAppointmentsByPatient.ts

import { AppointmentRepository } from "../../../domain/repositories/AppointmetRepository";
import { IAppointment } from "../../../domain/entities/Appointment";

export class GetAppointmentsByPatient {
  constructor(private appointmentRepo: AppointmentRepository) {}

  async execute(patientId: string): Promise<IAppointment[]> {
    return await this.appointmentRepo.getAppointmentsByPatient(patientId);
  }
}
