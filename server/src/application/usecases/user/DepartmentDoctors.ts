// src/application/use-cases/doctor/DepartmentDoctors.ts

import { DocotorRepository } from "../../../domain/repositories/DoctorRepository";
import { IDoctor } from "../../../domain/entities/Doctor";

export class DepartmentDoctors {
  constructor(private doctorRepo: DocotorRepository) {}

  async execute(departmentId: string): Promise<Partial<IDoctor>[]> {
    if (!departmentId) {
      throw new Error("Department ID is required");
    }

    const doctors = await this.doctorRepo.findDoctorsByDepartment(departmentId);
    return doctors;
  }
}
