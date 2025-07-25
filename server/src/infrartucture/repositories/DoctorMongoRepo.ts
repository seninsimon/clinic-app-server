import { AppointmentWithPatient } from "../../domain/entities/Appointmentwithpatient";
import { IDoctor } from "../../domain/entities/Doctor";
import { DocotorRepository } from "../../domain/repositories/DoctorRepository";
import { AppointmentModel } from "../models/AppointmentModel";
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

  async getDoctorWithDepartment(id: string): Promise<Partial<IDoctor> | null> {
    const doctor = await DoctorModel.findById(id).populate("specialisation").lean();
    
    if (!doctor) return null;

    return {
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      experience: doctor.experience,
      fee: doctor.fee,
      profilePicture: doctor.profilePicture,
      additionalInfo: doctor.additionalInfo,
      specialisation: doctor.specialisation, 
    };
  }

  async getAppointmentsByDoctorId(
  doctorId: string
): Promise<AppointmentWithPatient[]> {
  const appointments = await AppointmentModel.find({ doctor: doctorId })
    .populate("patient", "-password -isBlocked -googleIds")
    .lean();

  const formatted: AppointmentWithPatient[] = appointments.map((appt: any) => ({
    _id: appt._id.toString(),
    doctor: appt.doctor.toString(),
    patientDetails: appt.patient,
    date: appt.date,
    start: appt.start,
    end: appt.end,
    reason: appt.reason,
    status: appt.status,
    createdAt: appt.createdAt,
  }));

  return formatted;
}

 async updateAppointmentStatus(
    appointmentId: string,
    status: "booked" | "confirmed" | "completed" | "cancelled"
  ): Promise<boolean> {
    const result = await AppointmentModel.updateOne({ _id: appointmentId }, { $set: { status } });
    return result.modifiedCount > 0;
  }
}

