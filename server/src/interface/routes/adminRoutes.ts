import { AddDepartment } from "../../application/usecases/admin/AddDepartment";
import { GetAllPatients } from "../../application/usecases/admin/AllPatients";
import { ApproveDoctor } from "../../application/usecases/admin/ApproveDoctor";
import { BlockDoctor } from "../../application/usecases/admin/BlockDoctor";
import { TogglePatientBlock } from "../../application/usecases/admin/BlockPatient";
import { DeleteDepartment } from "../../application/usecases/admin/DeleteDepartment";
import { FindDepartment } from "../../application/usecases/admin/FindDept";
import { findDoctors } from "../../application/usecases/admin/FindDoctors";
import { UpdateDepartment } from "../../application/usecases/admin/UpdateDepartment";
import { verifyToken } from "../../infrartucture/middleware/verifyToken";
import { DepartmentRepoImp } from "../../infrartucture/repositories/DepartmentMongoRepo";
import { DoctorRepoImp } from "../../infrartucture/repositories/DoctorMongoRepo";
import { UserRepositoryImpl } from "../../infrartucture/repositories/UserMongoRepo";
import { AdminController } from "../controller/AdminController";
import express from "express";
const router = express.Router();

const departmentRepo = new DepartmentRepoImp();
const doctorRepo = new DoctorRepoImp();
const userRepo = new UserRepositoryImpl();

const addDepartment = new AddDepartment(departmentRepo);
const findAllDepts = new FindDepartment(departmentRepo);
const findAllDocs = new findDoctors(doctorRepo);
const approveDoc = new ApproveDoctor(doctorRepo);
const blockdoc = new BlockDoctor(doctorRepo);
const fetchpatients = new GetAllPatients(userRepo);
const blockpatient = new TogglePatientBlock(userRepo);
const deletedepartment = new DeleteDepartment(departmentRepo)
const updatedepartment = new UpdateDepartment(departmentRepo)

const admincontroller = new AdminController(
  addDepartment,
  findAllDepts,
  findAllDocs,
  approveDoc,
  blockdoc,
  fetchpatients,
  blockpatient,
  updatedepartment,
  deletedepartment,
  
);

router.post("/admin/add-department", (req, res) =>
  admincontroller.createDepartment(req, res)
);
router.get("/admin/fetch-departments", (req, res) =>
  admincontroller.allDept(req, res)
);
router.get("/admin/fetch-doctors", (req, res) =>
  admincontroller.findAllDocs(req, res)
);

router.get("/admin/doctor-details", (req, res) =>
  admincontroller.docDetails(req, res)
);

router.patch("/admin/doctors-verify/:id", verifyToken, (req, res) =>
  admincontroller.approveDoctor(req, res)
);

router.patch("/admin/doctors-block/:id", verifyToken, (req, res) =>
  admincontroller.blockOrUnblockDoctor(req, res)
);

router.get("/admin/patients", verifyToken, (req, res) =>
  admincontroller.findallpatients(req, res)
);
router.patch("/admin/patient-block/:id/", (req, res) =>
  admincontroller.blockPatient(req, res)
);

router.put("/admin/departments/:id", (req, res) =>
  admincontroller.updateDepartment(req, res));

router.delete("/admin/departments/:id", (req, res) =>
  admincontroller.deleteDepartment(req, res));


export { router as adminRouter };
