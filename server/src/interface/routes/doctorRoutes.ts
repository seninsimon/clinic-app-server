import express from "express";
import { DoctorController } from "../controller/DoctorController";
import { DepartmentController } from "../controller/DepartmentController";
import { DoctorRepoImp } from "../../infrartucture/repositories/DoctorMongoRepo";
import { DepartmentRepoImp } from "../../infrartucture/repositories/DepartmentMongoRepo";
import { RegisterDoctor } from "../../application/usecases/doctor/Register";
import { FindDepartment } from "../../application/usecases/admin/FindDept";
import { LoginDoctor } from "../../application/usecases/doctor/Login";
import { JwtServiceImpl } from "../../application/services/jwtService";

const router = express.Router();

// 1. Repository instances
const doctorRepo = new DoctorRepoImp();
const departmentRepo = new DepartmentRepoImp(); // ✅ correct repo
const jwtRepo = new JwtServiceImpl()


// 2. UseCase instances
const registerDoctor = new RegisterDoctor(doctorRepo);
const findDepartments = new FindDepartment(departmentRepo); // ✅ correct injection
const loginDoctor = new LoginDoctor(doctorRepo , jwtRepo)



// 3. Controller instances
const doctorController = new DoctorController(registerDoctor , loginDoctor);
const departmentController = new DepartmentController(findDepartments); 

// 4. Routes
router.post("/doctor-signup", (req, res) => doctorController.doctorSignup(req, res));
router.get("/doctor/departments", (req, res) => departmentController.allDept(req, res)); 
router.post("/doctor/login", (req, res) => doctorController.doctorLogin(req , res)); 

export { router as doctorRouter };
