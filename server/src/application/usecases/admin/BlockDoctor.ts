
import { DocotorRepository } from "../../../domain/repositories/DoctorRepository";

export class BlockDoctor {
  constructor(private docRepo: DocotorRepository) {}

  async execute(doctorId: string, isBlocked: boolean): Promise<{ message: string }> {
    try {
       
      const result = await this.docRepo.updateBlockStatus(doctorId, isBlocked);

      if (!result) throw new Error("Doctor not found or failed to update");

      return {
        message: `Doctor has been ${isBlocked ? "blocked" : "unblocked"} successfully.`,
      };
    } catch (error) {
      console.error("Error in BlockDoctor usecase:", error);
      throw new Error("Failed to update doctor block status");
    }
  }
}
