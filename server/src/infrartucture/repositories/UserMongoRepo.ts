import { IOtp } from "../../domain/entities/Otp";
import { IUser } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { OtpModel } from "../models/Otpmodel";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcryptjs";

export class UserRepositoryImpl implements UserRepository {
  // registering patient
  async createUser(user: Partial<IUser>): Promise<IUser> {
    const createdUser = await UserModel.create(user);

    return createdUser;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email });
    return user;
  }

  async createOtp(data: IOtp): Promise<void> {
    const otp = await OtpModel.create(data);
  }

  async verifyOtp(email: string, otp: string): Promise<void> {
    const user = await OtpModel.findOne({ email });

    if (!user) throw new Error("invalid user");

    if (user.otp !== otp) throw new Error("invalid otp");

    await UserModel.findOneAndUpdate({ email }, { isVerified: true });

    await OtpModel.findByIdAndDelete(user.id);
  }

  async findUserById(id: string): Promise<Partial<IUser>> {
    const user = await UserModel.findById(id).select("-password"); // Exclude sensitive fields
    if (!user) {
      throw new Error("User not found");
    }
    return user.toObject(); // Convert Mongoose Document to plain object
  }

  async updateUser(userId: string, updates: Partial<IUser>): Promise<void> {
    const result = await UserModel.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!result) {
      throw new Error("Failed to update user");
    }
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = bcrypt.compare(oldPassword, user.password!);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
  }

    async findAllPatients(): Promise<IUser[]> {
    return await UserModel.find({ role: "patient" });
  }

  async toggleBlockStatus(userId: string, block: boolean): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { isBlocked: block });
  }

}
