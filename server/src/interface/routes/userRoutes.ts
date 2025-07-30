import { RegisterUser } from "../../application/usecases/user/Register";
import { OtpCreation } from "../../application/usecases/otp/Otpcreation";
import { VerifyOtp } from "../../application/usecases/otp/OtpVerification";
import { Login } from "../../application/usecases/user/Login";

import express from "express";
import { UserRepositoryImpl } from "../../infrartucture/repositories/UserMongoRepo";
import { UserController } from "../controller/UserController";
import { UserInfo } from "../../application/usecases/user/UserInfo";
import { verifyToken } from "../../infrartucture/middleware/verifyToken";
import { UpdateUser } from "../../application/usecases/user/UpdateUser";
import { ChangeUserPassword } from "../../application/usecases/user/ChangePassword";
import { DepartmentRepoImp } from "../../infrartucture/repositories/DepartmentMongoRepo";
import { DepartmentDoctors } from "../../application/usecases/user/DepartmentDoctors";
import { DoctorRepoImp } from "../../infrartucture/repositories/DoctorMongoRepo";
import { DoctorDetails } from "../../application/usecases/user/DoctorDetails";
import { SlotRepoImpl } from "../../infrartucture/repositories/SlotMongoRepo";
import { AppointmentRepositoryImp } from "../../infrartucture/repositories/AppointmentMongoRepo";
import { AvailableSlots } from "../../application/usecases/user/AvailableSlots";
import { BookAppointment } from "../../application/usecases/user/BookAppointment";
import { GetAppointmentsByPatient } from "../../application/usecases/user/AppointmentByPatient";
import { CancelAppointment } from "../../application/usecases/user/CancelAppointment";
import { TransactionRepositoryImpl } from "../../infrartucture/repositories/TransactionRepoImp";
import { WalletRepositoryImpl } from "../../infrartucture/repositories/WalletRepoImp";
import { CancelAppointmentWithRefund } from "../../application/usecases/user/CancelAppintmentWithRefund";
const router = express.Router();

//dependency injection

// 1. Create repository instance
const userRepo = new UserRepositoryImpl();
const deptRepo = new DepartmentRepoImp();
const doctorRepo = new DoctorRepoImp();
const slotRepo = new SlotRepoImpl();
const appointmentRepo = new AppointmentRepositoryImp();
const walletRepo = new WalletRepositoryImpl()
const transactionRepo = new TransactionRepositoryImpl();

//database to usecase to controller
// 2. Create use case instances
const registeruser = new RegisterUser(userRepo);
const otpCreation = new OtpCreation(userRepo);
const verifyOtp = new VerifyOtp(userRepo);
const loginUse = new Login(userRepo);
const userInfo = new UserInfo(userRepo);
const updateuser = new UpdateUser(userRepo);
const changePassword = new ChangeUserPassword(userRepo);
const departmentDoctors = new DepartmentDoctors(doctorRepo);
const doctordetails = new DoctorDetails(doctorRepo);
const availableSlots = new AvailableSlots(slotRepo, appointmentRepo);
const bookAppointment = new BookAppointment(
  appointmentRepo,
  walletRepo,
  transactionRepo,
);
const getAppointmentsByPatient = new GetAppointmentsByPatient(appointmentRepo);
const cancelAppointment = new CancelAppointment(appointmentRepo);
const cancelAppointmentWithRefund = new CancelAppointmentWithRefund(
  appointmentRepo,
  walletRepo,
  transactionRepo
);

// 3. Inject all into the controller
const usercontroller = new UserController(
  registeruser,
  otpCreation,
  verifyOtp,
  loginUse,
  userInfo,
  updateuser,
  changePassword,
  departmentDoctors,
  doctordetails,
  availableSlots,
  bookAppointment,
  getAppointmentsByPatient,
  cancelAppointment,
  cancelAppointmentWithRefund
);

router.post("/signup", (req, res) => usercontroller.signup(req, res));
router.post("/login", (req, res) => usercontroller.login(req, res));
router.post("/send-otp", (req, res) => usercontroller.sendOtp(req, res));
router.post("/verify-otp", (req, res) => usercontroller.verifyingOtp(req, res));
router.post("/google-login", (req, res) =>
  usercontroller.googleLogin(req, res)
);
router.get("/me", verifyToken, (req, res) =>
  usercontroller.userInformaion(req, res)
);
router.put("/user/update", verifyToken, (req, res) =>
  usercontroller.updateUser(req, res)
);
router.put("/user/change-password", verifyToken, (req, res) =>
  usercontroller.changepass(req, res)
);
router.get("/user/doctors/department/:id", (req, res) =>
  usercontroller.departmentDoctorsHandler(req, res)
);
router.get("/user/doctor/:id", (req, res) =>
  usercontroller.getDoctorDetails(req, res)
);

router.get("/user/doctor/:doctorId/slots", (req, res) =>
  usercontroller.getDoctorAvailableSlots(req, res)
);

router.post("/appointments/book", verifyToken, (req, res) =>
  usercontroller.bookAppointmentHandler(req, res)
);
router.get("/appointments/user", verifyToken, (req, res) =>
  usercontroller.getAppointmentsByPatient(req, res)
);

// Cancel appointment by ID
router.delete("/appointment-cancel/:id", verifyToken, (req, res) =>
  usercontroller.cancelAppointmentRefund(req, res)
);

export { router as userRouter };
