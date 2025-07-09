import { IDoctor } from "../../../domain/entities/Doctor";
import { DocotorRepository } from "../../../domain/repositories/DoctorRepository";
import bcrypt from "bcryptjs"



export class RegisterDoctor {

    constructor(
        private doctorRepo : DocotorRepository
    ){}


    async signupDoctor( data : Partial<IDoctor>) : Promise<{message : string , data : Partial<IDoctor>}>
     {
      try {

        const doctorExist = await this.doctorRepo.findByEmail(data.email!)
        if(doctorExist) throw new Error("doctor already exists")

       

       const hashedPassword = await bcrypt.hash(data.password! , 10)

        const newData : Partial<IDoctor> = {
            name : data.name,
            email : data.email,
            password : hashedPassword ,
            phone : data.phone ,
            specialisation : data.specialisation,
            experience : data.experience,
            fee : data.fee,
            medicalLicence : data.medicalLicence,
            additionalInfo : data.additionalInfo,
            profilePicture : data.profilePicture,
            status: "Pending",            // Default for new doctor
            isBlocked: false              // Default value
          
        }

        console.log(newData)

        const doctor =  await this.doctorRepo.createDoctor(newData)


        console.log(doctor)
        return {message : "doctor registered" , data : doctor}
      } catch (error) {
      
        console.log("error in usecase in registering doctor")
        throw new Error("Unexpected error occurred during doctor registration");
      }

}
}