import { UserRepository } from "../../../domain/repositories/UserRepository";
import { IUser } from "../../../domain/entities/User";

export class GetAllPatients {
  constructor(private userRepo: UserRepository) {}

  async execute(): Promise<{ message: string; patients: IUser[] }> {
    const users = await this.userRepo.findAllPatients();
    return {
      message: "Patients fetched successfully",
      patients : users,
    };
  }
}
