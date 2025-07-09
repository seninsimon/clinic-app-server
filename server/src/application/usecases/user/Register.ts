import { UserRepository } from "../../../domain/repositories/UserRepository";
import { IUser } from "../../../domain/entities/User";
import bcrypt from "bcryptjs"


export class RegisterUser {
    
    constructor(private userRepo : UserRepository){}

     async signup( data : Partial<IUser>) : Promise<{message : string , data : Partial<IUser>}>
     {

       try {

        const userExist = await this.userRepo.findByEmail(data.email!)

        if(userExist) throw new Error("user already exists")

        const hashedPassword = await bcrypt.hash(data.password! , 10)

        const newData = {
            name : data.name,
            email : data.email,
            password : hashedPassword ,
            gender : data.gender,
            phone : data.phone,    
        }

        const newUser = await this.userRepo.createUser(newData)

        return {message : "user created successfully" , data : newUser}
        
       } 
       catch (error) {
         
         if (error instanceof Error) {
         throw new Error(error.message);
         }
          throw new Error("Unexpected error occurred during user registration");
       }

    
     }
}