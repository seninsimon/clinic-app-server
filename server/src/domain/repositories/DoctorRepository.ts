import { IAppointment } from "../entities/Appointment";
import { AppointmentWithPatient } from "../entities/Appointmentwithpatient";
import { IDoctor } from "../entities/Doctor";
import { IUser } from "../entities/User";

export interface DocotorRepository {
  createDoctor(doctor: Partial<IDoctor>): Promise<IDoctor>;

  findByEmail(email: string): Promise<IDoctor | null>;

  findAllDoctors(): Promise<Partial<IDoctor>[]>;

  findById(id: string): Promise<IDoctor | null>;

  updateDoctorStatus(
    id: string,
    status: "Approved" | "Rejected"
  ): Promise<void>;

  doctorDetails(): Promise<Partial<IDoctor>[]>;

  updateBlockStatus(doctorId: string, isBlocked: boolean): Promise<boolean>;

  findDoctorsByDepartment(departmentId: string): Promise<Partial<IDoctor>[]>;

  getDoctorWithDepartment(id: string): Promise<Partial<IDoctor> | null>;

  getAppointmentsByDoctorId(doctorId: string): Promise<AppointmentWithPatient[]>;

  updateAppointmentStatus(appointmentId: string,status: "booked" | "confirmed" | "completed" | "cancelled"): Promise<boolean>;
}
