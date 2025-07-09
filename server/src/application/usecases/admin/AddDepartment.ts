import { IDepartment } from "../../../domain/entities/Department";
import { DepartmentRepository } from "../../../domain/repositories/DeparmtmentReposiotry";




export class AddDepartment 
{
    constructor(
        private deptRepo : DepartmentRepository
    )
    {}


    async addDept(deptData : Partial<IDepartment>) : Promise<{message : string}>
    {
        try {
          
            const trimed = deptData.deptName!.trim().toLowerCase()
            const deptExisting = await this.deptRepo.findByName(trimed)
            if(deptExisting) throw new Error("dept already exists")
              
                
                const newDeptData : Partial<IDepartment> = {

                    deptName : trimed,
                    description : deptData.description    
                }

            const dept = await this.deptRepo.createDepartment(newDeptData)

            return {message : "dept add success"} 
            
        } catch (error) {
            console.log("error in adding dept usecase :",error)
            throw new Error("error in add deptUsecase")
        }

    }

    
}