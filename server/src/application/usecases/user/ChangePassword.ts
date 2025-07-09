

import { UserRepository } from "../../../domain/repositories/UserRepository";

export class ChangeUserPassword {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, oldPassword: string, newPassword: string): Promise<{ message: string }> {
    await this.userRepository.changePassword(userId, oldPassword, newPassword);
    return { message: "Password changed successfully" };
  }
}
