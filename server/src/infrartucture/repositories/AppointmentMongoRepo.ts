import { IAppointment } from "../../domain/entities/Appointment";
import { AppointmentRepository } from "../../domain/repositories/AppointmetRepository";
import { AppointmentModel } from "../models/AppointmentModel";
import { Types } from "mongoose";

export class AppointmentRepositoryImp implements AppointmentRepository {
  constructor() {}

   async book(appointment: IAppointment): Promise<IAppointment> {
    const created = await AppointmentModel.create(appointment);
    return created.toObject();
  }

  async isSlotBooked(
    doctorId: string,
    date: string,
    start: string,
    end: string
  ): Promise<boolean> {
    const existing = await AppointmentModel.findOne({
      doctor: doctorId,
      date: date,
      start: start,
      end: end,
    });

    return !!existing;
  }

  async cancelAppointment(appointmentId: string): Promise<boolean> {
    const result = await AppointmentModel.findByIdAndDelete(appointmentId);
    return !!result;
  }

  async getAppointmentsByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<IAppointment[]> {
    return await AppointmentModel.find({
      doctor: new Types.ObjectId(doctorId),
      date,
    }).sort({ start: 1 }); // sorted by time
  }

  async getAppointmentsByPatient(patientId: string): Promise<IAppointment[]> {
    return await AppointmentModel.find({
      patient: new Types.ObjectId(patientId),
    })
      .populate("doctor", "name specialization") // optional: populate doctor info
      .sort({ date: -1, start: -1 }); // latest appointments first
  }

   async getById(appointmentId: string): Promise<IAppointment | null> {
    return AppointmentModel.findById(appointmentId)
      .populate("doctor")   // required for doctor.fee
      .populate("patient"); // required for userId
  }

  
}
