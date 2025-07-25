// src/application/usecases/doctor/PatientAppointment.ts

import { DocotorRepository } from "../../../domain/repositories/DoctorRepository";
import { AppointmentWithPatient } from "../../../domain/entities/Appointmentwithpatient";

export class PatientAppointment {
  constructor(
    private doctorRepo: DocotorRepository
  ) {}

  async execute(doctorId: string): Promise<AppointmentWithPatient[]> {
    if (!doctorId) throw new Error("Doctor ID is required");

    const appointments = await this.doctorRepo.getAppointmentsByDoctorId(doctorId);
    return appointments;
  }
}
