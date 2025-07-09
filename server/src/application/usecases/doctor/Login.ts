import { DocotorRepository } from "../../../domain/repositories/DoctorRepository";
import bcrypt from "bcryptjs";
import { JwtServiceImpl } from "../../services/jwtService";

export class LoginDoctor {
  constructor(private doctorRepo: DocotorRepository ,
    private jwtRepo : JwtServiceImpl
  ) {}

  async loginDoctor(email: string, password: string): Promise<{ message: string , token : string , role : string , status : string}> {
    try {
      const doctorExist = await this.doctorRepo.findByEmail(email);

      if (!doctorExist) {
        throw new Error("Doctor does not exist");
      }

      if (doctorExist.isBlocked) {
        throw new Error("Doctor is blocked by admin");
      }

      if (doctorExist.status !== "Approved") {
        throw new Error(`Doctor is not approved, current status: ${doctorExist.status}`);
      }

      const isMatch = await bcrypt.compare(password, doctorExist.password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }


       const token = this.jwtRepo.generateToken({
        id: doctorExist._id,
        role: "doctor",
        email: doctorExist.email,
        name: doctorExist.name,
      });

      
      return { message: "Doctor login successful" , token : token , role : doctorExist.role , status : doctorExist.status} ;

    } catch (error: any) {
      console.error("Error in usecase of login doctor:", error.message);
      throw new Error(error.message || "Error in doctor login");
    }
  }
}
