// src/application/usecases/UpdateAppointmentStatus.ts

import { DocotorRepository } from "../../../domain/repositories/DoctorRepository";

export class UpdateAppointmentStatus {
  constructor(private readonly doctorRepository: DocotorRepository) {}

  async execute(
    appointmentId: string,
    status: "booked" | "confirmed" | "completed" | "cancelled"
  ): Promise<{ success: boolean; message: string }> {
    const updated = await this.doctorRepository.updateAppointmentStatus(
      appointmentId,
      status
    );

    if (!updated) {
      return {
        success: false,
        message: "Failed to update status or appointment not found",
      };
    }

    return { success: true, message: `Appointment ${status} successfully.` };
  }
}
