import { Request , Response } from "express"
import { FindDepartment } from "../../application/usecases/admin/FindDept";



export class DepartmentController {
     constructor(
           
            private allDepts : FindDepartment
        )
        {}

        async allDept(req : Request , res : Response) : Promise<void>
    {
        try {

            const fetchDept = await this.allDepts.findDept()
            console.log(fetchDept)
             res.status(200).json({message : "all depts fetched"  , fetchDept})
            
        } catch (error : any) {
            console.log(error.message)
            
        }
    }
}