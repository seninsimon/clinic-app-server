
import { DocotorRepository } from "../../../domain/repositories/DoctorRepository";

export class ApproveDoctor {
  constructor(private docRepo: DocotorRepository) {}

  async execute(doctorId: string, status: "Approved" | "Rejected"): Promise<{ message: string }> {
    if (!["Approved", "Rejected"].includes(status)) {
      throw new Error("Invalid status. Must be 'Approved' or 'Rejected'");
    }

    const doctor = await this.docRepo.findById(doctorId);
    if (!doctor) {
      throw new Error("Doctor not found");
    }

    await this.docRepo.updateDoctorStatus(doctorId, status);

    return { message: `Doctor ${status.toLowerCase()} successfully` };
  }
}
