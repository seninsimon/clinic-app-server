// src/domain/usecases/UserInfo.ts

import { IUser } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";


export class UserInfo {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<Partial<IUser>> {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    
    delete (user as any).password;

    return user;
  }
}
