import { IDoctor } from "../../domain/entities/Doctor";
import { DocotorRepository } from "../../domain/repositories/DoctorRepository";
import { DoctorModel } from "../models/DoctorModel";

export class DoctorRepoImp implements DocotorRepository {
  async createDoctor(doctor: Partial<IDoctor>): Promise<IDoctor> {
    const createdDoctor = await DoctorModel.create(doctor);
    return createdDoctor;
  }

  async findByEmail(email: string): Promise<IDoctor | null> {
    const doc = await DoctorModel.findOne({ email });
    return doc;
  }

  async findAllDoctors(): Promise<Partial<IDoctor>[]> {
    const docs = await DoctorModel.find({ status: "Pending" });
    console.log(docs);
    return docs;
  }

  async findById(id: string): Promise<IDoctor | null> {
    return await DoctorModel.findById(id);
  }

  async updateDoctorStatus(
    id: string,
    status: "Approved" | "Rejected"
  ): Promise<void> {
    await DoctorModel.findByIdAndUpdate(id, { status });
  }

  async doctorDetails(): Promise<Partial<IDoctor>[]> {
    const docs = await DoctorModel.find({ status: "Approved" });
    console.log("approved docs : ",docs)
    return docs
  }

  async updateBlockStatus(doctorId: string, isBlocked: boolean): Promise<boolean> {
      const result = await DoctorModel.findByIdAndUpdate(
      doctorId,
      { isBlocked },
      { new: true }
    );
    return !!result;
  }

  async findDoctorsByDepartment(departmentId: string): Promise<Partial<IDoctor>[]> {
    return await DoctorModel.find({
      specialisation: departmentId,
      status: "Approved",
      isBlocked: false,
    }).populate("specialisation", "deptName").select("name email phone experience fee additionalInfo profilePicture");
  }
}

