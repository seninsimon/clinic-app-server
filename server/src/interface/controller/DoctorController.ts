import { LoginDoctor } from "../../application/usecases/doctor/Login";
import { RegisterDoctor } from "../../application/usecases/doctor/Register";
import { Request, Response } from "express";

export class DoctorController {
  constructor(
    private registerDoc: RegisterDoctor,
    private loginDoc: LoginDoctor
  ) {}


 //doctor signup


  async doctorSignup(req: Request, res: Response): Promise<void> {
    try {
      const data: any = req.body;

      const registerDoctor = await this.registerDoc.signupDoctor(data);
      res.status(201).json({ message: "user registerd", data: registerDoctor });
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error in registering doctor" });
    }
  }

  //doctor login

  async doctorLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      

      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const result = await this.loginDoc.loginDoctor(email, password);

      res.status(200).json({
        message: result.message,
        token: result.token,
        role : result.role,
        status : result.status
      });
    } catch (error: any) {
      console.error("Login error:", error.message);
      res.status(401).json({ message: error.message || "Login failed" });
    }
  }
}
