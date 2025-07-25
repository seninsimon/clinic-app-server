import { Request, Response } from "express";
import { RegisterUser } from "../../application/usecases/user/Register";
import { OtpCreation } from "../../application/usecases/otp/Otpcreation";
import { VerifyOtp } from "../../application/usecases/otp/OtpVerification";
import { Login } from "../../application/usecases/user/Login";
import { generateOtp } from "../../application/services/OtpSevice";
import { sendMail } from "../../application/services/nodeMailerService";
import { UserInfo } from "../../application/usecases/user/UserInfo";
import { UpdateUser } from "../../application/usecases/user/UpdateUser";
import { ChangeUserPassword } from "../../application/usecases/user/ChangePassword";
import { DepartmentDoctors } from "../../application/usecases/user/DepartmentDoctors";
import { DoctorDetails } from "../../application/usecases/user/DoctorDetails";
import { AvailableSlots } from "../../application/usecases/user/AvailableSlots";
import { BookAppointment } from "../../application/usecases/user/BookAppointment";
import { GetAppointmentsByPatient } from "../../application/usecases/user/AppointmentByPatient";
import { CancelAppointment } from "../../application/usecases/user/CancelAppointment";

export class UserController {
  constructor(
    private registerUser: RegisterUser,
    private otpCreation: OtpCreation,
    private verifyOtp: VerifyOtp,
    private loginuse: Login,
    private userInfo: UserInfo,
    private updateuser: UpdateUser,
    private changePassword: ChangeUserPassword,
    private departmentdoctors: DepartmentDoctors,
    private doctordetails: DoctorDetails,
    private availableSlots: AvailableSlots,
    private bookAppointment: BookAppointment,
    private appointmentByPatient: GetAppointmentsByPatient,
    private cancelAppointment: CancelAppointment
  ) {}

  // 1. Signup
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, phone, gender } = req.body;
      const userRegistered = await this.registerUser.signup({
        name,
        email,
        password,
        phone,
        gender,
      });
      res.status(201).json({ message: "user registerd", data: userRegistered });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ message: errorMessage });
    }
  }

  // 2.login
  async login(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const { email, password } = req.body;

      const loginUser = await this.loginuse.loginUser(email, password);

      if (loginUser.data.isVerified === false) {
        res.status(400).json({
          message: "verification required ",
          otpverify: false,
          email: loginUser.data.email,
        });
        return;
      }

      res.status(200).json({ message: "user login success", loginUser });
    } catch (error) {
      res.status(500).json({ message: "internal server error in login user" });
    }
  }

  //3. sending the otp

  async sendOtp(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const { email } = req.body;
      const otp = generateOtp();

      await this.otpCreation.createOtp(email, otp); // this is for creation in database
      await sendMail(email, otp); // this is for sending to the mail

      res.status(200).json({ message: "otp sent" });
    } catch (error) {
      console.log("error in sending otp");
      res.status(500).json({ message: "internal server error in sending otp" });
    }
  }

  //4. verifying Otp

  async verifyingOtp(req: Request, res: Response): Promise<void> {
    try {
      const { otp, email } = req.body;

      await this.verifyOtp.verifyOtp(email, otp);

      res.status(200).json({ message: "otp verified successfully" });
    } catch (error) {
      console.log("error in sending otp");
      res.status(500).json({ message: "internal server error verifying otp" });
    }
  }

  async googleLogin(req: Request, res: Response): Promise<void> {
    try {
      const { tokenId } = req.body;
      const googleData = await this.loginuse.googleLogin(tokenId);
      res
        .status(200)
        .json({ message: "google login done successfully", googleData });
    } catch (error) {
      console.log("error google auth");
      res.status(500).json({ message: "internal server error google login" });
    }
  }

  //user information

  async userInformaion(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;

      if (!userId) {
        res
          .status(401)
          .json({ message: "Unauthorized: No user ID found in token" });
        return;
      }

      const user = await this.userInfo.execute(userId);

      res.status(200).json(user);
    } catch (error) {
      console.log("error in controller fettchign user");
      res
        .status(500)
        .json({ message: "internal server error in fetching user" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized: User ID missing" });
        return;
      }

      const updates = req.body;

      const user = await this.updateuser.execute(userId, updates);

      res.status(201).json(user);
    } catch (error) {
      console.log("error in controller updating user");
      res
        .status(500)
        .json({ message: "internal server error in updating user" });
    }
  }

  async changepass(req: Request, res: Response): Promise<void> {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = (req as any).user?.id;

      const user = await this.changePassword.execute(
        userId,
        oldPassword,
        newPassword
      );

      res.status(200).json(user);
    } catch (error) {
      console.log("error in controller change password of user");
      res
        .status(500)
        .json({ message: "internal server error in changing password" });
    }
  }

  async departmentDoctorsHandler(req: Request, res: Response): Promise<void> {
    try {
      const departmentId = req.params.id;

      if (!departmentId) {
        res.status(400).json({ message: "Department ID is required." });
        return;
      }

      const doctors = await this.departmentdoctors.execute(departmentId);

      res.status(200).json({ doctors });
    } catch (error: any) {
      console.error("❌ Error in departmentDoctors controller:", error.message);
      res.status(500).json({
        message: "Internal server error fetching doctors by department",
      });
    }
  }

  async getDoctorDetails(req: Request, res: Response): Promise<void> {
    try {
      const doctorId = req.params.id;

      if (!doctorId) {
        res.status(400).json({ message: "Doctor ID is required" });
        return;
      }

      const doctor = await this.doctordetails.execute(doctorId);

      if (!doctor) {
        res.status(404).json({ message: "Doctor not found" });
        return;
      }

      res.status(200).json({ doctor });
    } catch (error) {
      console.error("❌ Error fetching doctor details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getDoctorAvailableSlots(req: Request, res: Response) {
    try {
      const { doctorId } = req.params;
      const { date } = req.query;

      if (!doctorId || !date) {
        res.status(400).json({ message: "doctorId and date are required" });
        return;
      }

      const slots = await this.availableSlots.execute(doctorId, date as string);
      res.status(200).json({ slots });
    } catch (error) {
      console.error("Error fetching available slots:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async bookAppointmentHandler(req: Request, res: Response) {
  try {
    const { doctor, date, start, end, reason, fee } = req.body;
    console.log(req.body)
    const userId = (req as any).user?.id;

    if (!doctor || !date || !start || !end || !userId || fee === undefined) {
      res.status(400).json({ message: "All fields are required" });
      return  
    }

    const appointmentData = {
      doctor,
      patient: userId,
      date,
      start,
      end,
      reason,
      fee,
    };

    const appointment = await this.bookAppointment.execute(appointmentData);

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error: any) {
    console.error("Error booking appointment:", error.message || error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
}

  async getAppointmentsByPatient(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const appointments = await this.appointmentByPatient.execute(userId);
      res.status(200).json({ appointments });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Failed to fetch appointments" });
    }
  }

  async cancelAppointmentbyuser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Appointment ID is required" });
        return;
      }

      const success = await this.cancelAppointment.execute(id);

      if (success) {
        res.status(200).json({ message: "Appointment cancelled successfully" });
      } else {
        res
          .status(404)
          .json({ message: "Appointment not found or already cancelled" });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Failed to cancel appointment" });
    }
  }
}
