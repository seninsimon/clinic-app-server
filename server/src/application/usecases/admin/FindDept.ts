import { IDepartment } from "../../../domain/entities/Department";
import { DepartmentRepository } from "../../../domain/repositories/DeparmtmentReposiotry";

export class FindDepartment {

    constructor( private deptrepo : DepartmentRepository)
    {}

    async findDept() : Promise<{message : string , dept : IDepartment[]}>
    {

        try {

            const alldept = await this.deptrepo.findAll()
            if(!alldept) throw new Error("add any department , currently no departments")
            return {message : "all dept fetched " , dept : alldept}
            
        } catch (error) {
            console.log("error in fetch dept usecase")
            throw new Error("error in fetching dept in usecase")
            
        }



    }
}