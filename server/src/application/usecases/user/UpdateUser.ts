import { IUser } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";


export class UpdateUser {
    constructor(
        private  userRepo : UserRepository
    ){}

    async execute(userId: string, updates: Partial<IUser>): Promise<{ message: string }> {
    await this.userRepo.updateUser(userId, updates);
    return { message: "User updated successfully" };
}
}