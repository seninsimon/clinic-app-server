//controller always has usecases controller depends upon usecases
import { Request, Response } from "express";
import { AddDepartment } from "../../application/usecases/admin/AddDepartment";
import { FindDepartment } from "../../application/usecases/admin/FindDept";
import { findDoctors } from "../../application/usecases/admin/FindDoctors";
import { ApproveDoctor } from "../../application/usecases/admin/ApproveDoctor";
import { BlockDoctor } from "../../application/usecases/admin/BlockDoctor";
import { GetAllPatients } from "../../application/usecases/admin/AllPatients";
import { TogglePatientBlock } from "../../application/usecases/admin/BlockPatient";
import { UpdateDepartment } from "../../application/usecases/admin/UpdateDepartment";
import { DeleteDepartment } from "../../application/usecases/admin/DeleteDepartment";

export class AdminController {
  constructor(
    private AddDept: AddDepartment,
    private allDepts: FindDepartment,
    private allDocs: findDoctors,
    private ApproveDoc: ApproveDoctor,
    private blockDoctor: BlockDoctor,
    private getallpatients: GetAllPatients,
    private blockpatient: TogglePatientBlock,
    private updatedepartment: UpdateDepartment,
    private deletedepartment : DeleteDepartment
  ) {}

  async createDepartment(req: Request, res: Response): Promise<void> {
    try {
      const { deptName, description } = req.body;

      const newDept = await this.AddDept.addDept({ deptName, description });

      res.status(200).json({ message: "dept add success", dept: newDept });
    } catch (error: any) {
      console.log("error in add dept controller", error.message);
      res.status(500).json({ message: "internal server in adding dept" });
    }
  }

  async allDept(req: Request, res: Response): Promise<void> {
    try {
      const fetchDept = await this.allDepts.findDept();
      res.status(200).json({ message: "all depts fetched", fetchDept });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async findAllDocs(req: Request, res: Response): Promise<void> {
    try {
      const fetchdocs = await this.allDocs.findDoctors();
      res.status(200).json(fetchdocs);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async docDetails(req: Request, res: Response): Promise<void> {
    try {
      const fetchDocs = await this.allDocs.doctorDetails();
      console.log(fetchDocs);
      res.status(200).json(fetchDocs);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async approveDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["Approved", "Rejected"].includes(status)) {
        res.status(400).json({ message: "Invalid status value" });
        return;
      }

      await this.ApproveDoc.execute(id, status);
      res
        .status(200)
        .json({ message: `Doctor ${status.toLowerCase()} successfully` });
    } catch (error: any) {
      console.error("Error in approving doctor:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async blockOrUnblockDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { isBlocked } = req.body;
      console.log("the boolean", req.body);
      const result = await this.blockDoctor.execute(id, isBlocked);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async findallpatients(req: Request, res: Response): Promise<void> {
    try {
      const patients = await this.getallpatients.execute();
      res.status(200).json(patients);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async blockPatient(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { block } = req.body;

      const patientblock = await this.blockpatient.execute(id, block);
      res.status(200).json(patientblock);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateDepartment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      const result = await this.updatedepartment.updateDep(id, data);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message || "Failed to update department" });
    }
  }

 
  async deleteDepartment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await this.deletedepartment.execute(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message || "Failed to delete department" });
    }
  }
}



