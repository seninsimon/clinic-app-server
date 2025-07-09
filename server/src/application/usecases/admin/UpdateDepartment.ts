import { DepartmentRepository } from "../../../domain/repositories/DeparmtmentReposiotry";
import { IDepartment } from "../../../domain/entities/Department";

export class UpdateDepartment {
  constructor(
    private departmentRepo: DepartmentRepository
  ) {}

  async updateDep(
    id: string,
    data: Partial<IDepartment>
  ): Promise<{ message: string }> {
    try {
      const updated = await this.departmentRepo.updateDepartment(id, data);

      if (!updated) {
        throw new Error("Department not found or update failed");
      }

      return { message: "Department updated successfully" };
    } catch (error) {
      throw new Error((error as Error).message || "Failed to update department");
    }
  }
}
