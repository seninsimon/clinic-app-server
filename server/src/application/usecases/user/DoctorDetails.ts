import { DocotorRepository } from "../../../domain/repositories/DoctorRepository";
import { IDoctor } from "../../../domain/entities/Doctor";

export class DoctorDetails {
  constructor(private docrepo: DocotorRepository) {}

  async execute(doctorId: string): Promise<Partial<IDoctor> | null> {
    const doctor = await this.docrepo.getDoctorWithDepartment(doctorId);
    return doctor;
  }
}
