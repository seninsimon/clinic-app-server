
import { UserRepository } from "../../../domain/repositories/UserRepository";

export class VerifyOtp{
    constructor(
        private userRepo : UserRepository
    ){}

    async verifyOtp(email : string , otp : string) : Promise<{message : string}>
    {
        try {
             
             await this.userRepo.verifyOtp(email , otp)

             return {message : "otp verified"}

        } catch (error) {
            throw new Error("error in verifying otp")
        }

       
    }
}