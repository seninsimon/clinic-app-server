// // src/application/usecases/user/CancelAppointmentWithRefund.ts
// import { AppointmentRepository } from "../../../domain/repositories/AppointmetRepository";
// import { WalletRepository } from "../../../domain/repositories/WalletRepository";
// import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";

// export class CancelAppointmentWithRefund {
//   constructor(
//     private appointmentRepo: AppointmentRepository,
//     private walletRepo: WalletRepository,
//     private transactionRepo: TransactionRepository
//   ) {}

//   async execute(appointmentId: string): Promise<boolean> {
//   try {
//     const appointment = await this.appointmentRepo.findById(appointmentId);
//     if (!appointment) throw new Error("Appointment not found");

//     const fee = appointment.fee;
//     const patientId = appointment.patient?.toString();

//     if (!fee || fee <= 0) throw new Error("Invalid fee for refund");
//     if (!patientId) throw new Error("Invalid patient ID");

//     // Cancel appointment
//     const updated = await this.appointmentRepo.updateStatus(appointmentId, "cancelled");
//     if (!updated) throw new Error("Failed to cancel appointment");

//     // Refund process
//     await this.walletRepo.deductFromAdminWallet(fee);
//     await this.walletRepo.creditToUserWallet(patientId, fee);
//     await this.transactionRepo.createRefundTransaction(patientId, appointmentId, fee);

//     return true;
//   } catch (err) {
//     console.error("CancelAppointmentWithRefund error:", err);
//     throw err; // propagate to controller
//   }
// }
// }


// src/application/usecases/user/CancelAppointmentWithRefund.ts

import { AppointmentRepository } from "../../../domain/repositories/AppointmetRepository";
import { WalletRepository } from "../../../domain/repositories/WalletRepository";
import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";

export class CancelAppointmentWithRefund {
  constructor(
    private appointmentRepo: AppointmentRepository,
    private walletRepo: WalletRepository,
    private transactionRepo: TransactionRepository
  ) {}

  async execute(appointmentId: string): Promise<boolean> {
    try {
      const appointment = await this.appointmentRepo.findById(appointmentId);
      if (!appointment) throw new Error("Appointment not found");

      const fee = appointment.fee;
      const patientId = appointment.patient?.toString();

      if (typeof fee !== "number" || fee <= 0) {
        throw new Error("Invalid fee for refund");
      }

      if (!patientId) {
        throw new Error("Invalid patient ID");
      }

      // 1. Cancel appointment
      const updated = await this.appointmentRepo.updateStatus(appointmentId, "cancelled");
      if (!updated) throw new Error("Failed to cancel appointment");

      // 2. Deduct from admin & credit user
      await this.walletRepo.deductFromAdminWallet(fee);
      await this.walletRepo.creditToUserWallet(patientId, fee);

      // 3. Log refund transaction
      await this.transactionRepo.createRefundTransaction(patientId, appointmentId, fee);

      return true;
    } catch (err) {
      console.error("CancelAppointmentWithRefund error:", err);
      throw err;
    }
  }
}
