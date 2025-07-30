// src/domain/repositories/AppointmentRepository.ts

import { IAppointment } from "../entities/Appointment";


export interface AppointmentRepository {

  book(appointment: IAppointment): Promise<IAppointment>;


  isSlotBooked(doctorId: string, date: string, start: string, end: string): Promise<boolean>;


  getAppointmentsByDoctorAndDate(doctorId: string, date: string): Promise<IAppointment[]>;


  getAppointmentsByPatient(patientId: string): Promise<IAppointment[]>;


  cancelAppointment(appointmentId: string): Promise<boolean>;

  findById(appointmentId: string): Promise<IAppointment | null>;

  // ✅ NEW - update status of appointment
  updateStatus(appointmentId: string, status: "cancelled"): Promise<boolean>;


}
