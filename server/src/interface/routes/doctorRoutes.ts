import express from "express";
import { DoctorController } from "../controller/DoctorController";
import { DepartmentController } from "../controller/DepartmentController";
import { DoctorRepoImp } from "../../infrartucture/repositories/DoctorMongoRepo";
import { DepartmentRepoImp } from "../../infrartucture/repositories/DepartmentMongoRepo";
import { RegisterDoctor } from "../../application/usecases/doctor/Register";
import { FindDepartment } from "../../application/usecases/admin/FindDept";
import { LoginDoctor } from "../../application/usecases/doctor/Login";
import { JwtServiceImpl } from "../../application/services/jwtService";
import { verifyToken } from "../../infrartucture/middleware/verifyToken";
import { SlotRepoImpl } from "../../infrartucture/repositories/SlotMongoRepo";
import { SetSlot } from "../../application/usecases/doctor/AddSlot";
import { GetSlotByDay } from "../../application/usecases/doctor/GetSlot";
import { DeleteSlot } from "../../application/usecases/doctor/DeleteSlot";

const router = express.Router();

// 1. Repository instances
const doctorRepo = new DoctorRepoImp();
const departmentRepo = new DepartmentRepoImp(); // ✅ correct repo
const jwtRepo = new JwtServiceImpl();
const slotRepo = new SlotRepoImpl();

// 2. UseCase instances
const registerDoctor = new RegisterDoctor(doctorRepo);
const findDepartments = new FindDepartment(departmentRepo); // ✅ correct injection
const loginDoctor = new LoginDoctor(doctorRepo, jwtRepo);
const addSlot = new SetSlot(slotRepo);
const getSlot = new GetSlotByDay(slotRepo)
const deleteSlot = new DeleteSlot(slotRepo)

// 3. Controller instances
const doctorController = new DoctorController(
  registerDoctor,
  loginDoctor,
  addSlot,
  getSlot,
  deleteSlot
);
const departmentController = new DepartmentController(findDepartments);

// 4. Routes
router.post("/doctor-signup", (req, res) =>
  doctorController.doctorSignup(req, res)
);
router.get("/doctor/departments", (req, res) =>
  departmentController.allDept(req, res)
);
router.post("/doctor/login", (req, res) =>
  doctorController.doctorLogin(req, res)
);
router.put("/doctor/set-slot", verifyToken, (req, res) =>
  doctorController.setDoctorSlot(req, res)
);

router.get("/doctor/slots/:day", verifyToken, (req, res) =>
  doctorController.getSlotsByDay(req, res)
);

router.delete("/doctor/slots/:day", verifyToken, (req, res) =>
  doctorController.deleteSlotsByDay(req, res)
);

export { router as doctorRouter };
