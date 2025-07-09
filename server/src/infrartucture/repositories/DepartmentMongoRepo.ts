import { IDepartment } from "../../domain/entities/Department";
import { DepartmentRepository } from "../../domain/repositories/DeparmtmentReposiotry";
import DepartmentModel from "../models/DepartmentModel";

export class DepartmentRepoImp implements DepartmentRepository {
  async createDepartment(DeptData: IDepartment): Promise<IDepartment> {
    const newDept = await DepartmentModel.create(DeptData);
    return newDept;
  }

  async findAll(): Promise<IDepartment[]> {
    const allDept = await DepartmentModel.find();
    return allDept;
  }

  async findByName(name: string): Promise<IDepartment | null> {
    const dept = await DepartmentModel.findOne({ deptName: name });
    return dept;
  }

  async updateDepartment(id: string, data: Partial<IDepartment>): Promise<IDepartment | null> {
    const updatedDept = await DepartmentModel.findByIdAndUpdate(id, data, {
      new: true, // return the updated document
      runValidators: true, // apply schema validations
    });

    return updatedDept;
  }

  async deleteDepartment(id: string): Promise<boolean> {
    const result = await DepartmentModel.findByIdAndDelete(id);
    return !!result; // return true if found & deleted, false if not found
  }
}
