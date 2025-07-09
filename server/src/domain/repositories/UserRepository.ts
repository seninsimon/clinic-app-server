import { IUser } from "../entities/User";
import { IOtp } from "../entities/Otp";

export interface UserRepository {
  createUser(user: Partial<IUser>): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  createOtp(data: IOtp): Promise<void>;
  verifyOtp(email: string, otp: string): Promise<void>;
  findUserById(id: string): Promise<Partial<IUser>>;
  updateUser(userId: string, updates: Partial<IUser>): Promise<void>;
  changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void>;
  findAllPatients(): Promise<IUser[]>;
  toggleBlockStatus(userId: string, block: boolean): Promise<void>;
}
