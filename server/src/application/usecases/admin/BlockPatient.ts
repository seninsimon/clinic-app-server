import { UserRepository } from "../../../domain/repositories/UserRepository";

export class TogglePatientBlock {
  constructor(private userRepo: UserRepository) {}

  async execute(userId: string, block: boolean): Promise<{ message: string }> {
    await this.userRepo.toggleBlockStatus(userId, block);
    return { message: `Patient ${block ? "blocked" : "unblocked"} successfully` };
  }
}
