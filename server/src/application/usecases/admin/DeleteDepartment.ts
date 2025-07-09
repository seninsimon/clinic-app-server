// DeleteDepartment.ts
import { DepartmentRepository } from "../../../domain/repositories/DeparmtmentReposiotry";

export class DeleteDepartment {
  constructor(private departmentRepo: DepartmentRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    try {
      const deleted = await this.departmentRepo.deleteDepartment(id);
      if (!deleted) {
        throw new Error("Department not found or could not be deleted");
      }
      return { message: "Department deleted successfully" };
    } catch (error) {
      throw new Error((error as Error).message || "Failed to delete department");
    }
  }
}
