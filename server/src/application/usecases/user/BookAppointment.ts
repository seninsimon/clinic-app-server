
import { AppointmentRepository } from "../../../domain/repositories/AppointmetRepository";
import { IAppointment } from "../../../domain/entities/Appointment";
import { WalletRepository } from "../../../domain/repositories/WalletRepository";
import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";

export class BookAppointment {
  constructor(
    private readonly appointmentRepo: AppointmentRepository,
    private readonly walletRepo: WalletRepository,
    private readonly transactionRepo: TransactionRepository
  ) {}

  async execute(appointmentData: IAppointment): Promise<IAppointment> {
    const { doctor, patient, date, start, end, fee } = appointmentData;

    const isBooked = await this.appointmentRepo.isSlotBooked(
      doctor.toString(),
      date,
      start,
      end
    );

    if (isBooked) {
      throw new Error("Slot already booked. Please choose another.");
    }

    // Step 1: Book appointment
    const appointment = await this.appointmentRepo.book(appointmentData);

    // Step 2: Update Admin Wallet
    const wallet = await this.walletRepo.getAdminWallet();
    if (!wallet) {
      await this.walletRepo.createAdminWallet();
    }
    await this.walletRepo.incrementAdminBalance(fee);

    // Step 3: Save Transaction
    await this.transactionRepo.createTransaction({
      fromUser: patient.toString(), // ✅ convert ObjectId to string
      amount: fee,
      appointmentId: appointment._id!.toString(), // ✅ convert and assert it's defined
    });

    return appointment;
  }
}
















// import { AppointmentRepository } from "../../../domain/repositories/AppointmetRepository";
// import { IAppointment } from "../../../domain/entities/Appointment";
// import { WalletRepository } from "../../../domain/repositories/WalletRepository";
// import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";

// export class BookAppointment {
//   constructor(
//     private readonly appointmentRepo: AppointmentRepository,
//     private readonly walletRepo: WalletRepository,
//     private readonly transactionRepo: TransactionRepository
//   ) {}

//   async execute(appointmentData: IAppointment): Promise<IAppointment> {
//     const { doctor, patient, date, start, end, fee } = appointmentData;

//     const isBooked = await this.appointmentRepo.isSlotBooked(
//       doctor.toString(),
//       date,
//       start,
//       end
//     );

//     if (isBooked) {
//       throw new Error("Slot already booked. Please choose another.");
//     }

//     // Step 1: Book appointment
//     const appointment = await this.appointmentRepo.book(appointmentData);

//     // Step 2: Update Admin Wallet
//     const wallet = await this.walletRepo.getAdminWallet();
//     if (!wallet) {
//       await this.walletRepo.createAdminWallet();
//     }
//     await this.walletRepo.incrementAdminBalance(fee);

//     // Step 3: Save Transaction
//     await this.transactionRepo.createTransaction({
//       fromUser: patient.toString(), // ✅ convert ObjectId to string
//       amount: fee,
//       appointmentId: appointment._id!.toString(), // ✅ convert and assert it's defined
//     });

//     return appointment;
//   }
// }
