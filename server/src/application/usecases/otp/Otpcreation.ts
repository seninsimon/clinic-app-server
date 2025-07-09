import { IOtp } from "../../../domain/entities/Otp";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export class OtpCreation {
    constructor(
        private userRepo : UserRepository
    ){}

    async createOtp(email : string , otp : string) : Promise<{message : string}>
    {
        try {
            const otpData : IOtp = 
            {
                email , otp , createdAt : new Date()
            }

             await this.userRepo.createOtp(otpData)
             return {message : "otp created successfully"}

        } catch (error) {

            throw new Error("error in creating otp")
        }
    }
}