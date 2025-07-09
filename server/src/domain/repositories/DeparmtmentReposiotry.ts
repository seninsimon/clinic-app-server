import { IDepartment } from "../entities/Department";

export interface DepartmentRepository {
  createDepartment(DeptData: Partial<IDepartment>): Promise<IDepartment>;
  findAll(): Promise<IDepartment[]>;
  findByName(name: string): Promise<IDepartment | null>;
  updateDepartment(
    id: string,
    data: Partial<IDepartment>
  ): Promise<IDepartment | null>;
  deleteDepartment(id: string): Promise<boolean>;
}
