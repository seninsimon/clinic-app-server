import { IDoctor } from "../../../domain/entities/Doctor";
import { DocotorRepository } from "../../../domain/repositories/DoctorRepository";


export class findDoctors {
    constructor(
        private docRepo : DocotorRepository
    ){}//hi

    async findDoctors() : Promise<{message : string , doctors : Partial<IDoctor>[]}>
    {
        try {

            const docs = await this.docRepo.findAllDoctors()
            if(!docs) throw new Error("add any doctors , currently no doctors")
            return {message : "doctors fetched" , doctors : docs}
        } catch (error) {
            console.log("error in fetch doctors usecase")
            throw new Error("error in fetching doctors in usecase")
        }
    }


    async doctorDetails() : Promise<{message : string , doctors : Partial<IDoctor>[]}>
    {
        try {

            const docs = await this.docRepo.doctorDetails()
            if(!docs) throw new Error("add any doctors , currently no approved doctors")
            return {message : "doctors fetched" , doctors : docs}
        } catch (error) {
            console.log("error in fetch doctors usecase")
            throw new Error("error in fetching doctors in usecase")
        }
    }
}