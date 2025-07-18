// src/interfaces/controllers/DoctorController.ts

import { SetSlot } from "../../application/usecases/doctor/AddSlot";
import { LoginDoctor } from "../../application/usecases/doctor/Login";
import { RegisterDoctor } from "../../application/usecases/doctor/Register";
import { Request, Response } from "express";
import { ISlot } from "../../domain/entities/Slot";
import { GetSlotByDay } from "../../application/usecases/doctor/GetSlot";
import { DeleteSlot } from "../../application/usecases/doctor/DeleteSlot";

export class DoctorController {
  constructor(
    private registerDoc: RegisterDoctor,
    private loginDoc: LoginDoctor,
    private addslot: SetSlot,
     private getSlotByDay: GetSlotByDay,
     private deleteSlot : DeleteSlot
  ) {}

  // ✅ Doctor signup
  async doctorSignup(req: Request, res: Response): Promise<void> {
    try {
      const data: any = req.body;
      const registerDoctor = await this.registerDoc.signupDoctor(data);
      res.status(201).json({ message: "User registered", data: registerDoctor });
    } catch (error) {
      res.status(500).json({ message: "Internal server error in registering doctor" });
    }
  }

  // ✅ Doctor login
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
        role: result.role,
        status: result.status,
      });
    } catch (error: any) {
      console.error("Login error:", error.message);
      res.status(401).json({ message: error.message || "Login failed" });
    }
  }

  // ✅ Add slot (new availability)
   async setDoctorSlot(req: Request, res: Response): Promise<void> {
    try {
      const doctorId = (req as any).user?.id;
      const { day, slots } = req.body;

      if (!doctorId || !day || !slots || !Array.isArray(slots)) {
        res.status(400).json({ message: "Invalid slot data" });
        return;
      }

      const updated = await this.addslot.execute(doctorId, day, slots);
      res.status(200).json({ message: "Slot updated", slot: updated });
    } catch (error) {
      console.error("Error in setDoctorSlot:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getSlotsByDay(req: Request, res: Response): Promise<void> {
    try {
      const doctorId = (req as any).user.id;
      const { day } = req.params;

      const slot = await this.getSlotByDay.execute(doctorId, day);
      
      res.status(200).json({ slots: slot?.slots || [] });
    } catch (err) {
      console.error("Error fetching slot", err);
      res.status(500).json({ message: "Failed to fetch slots" });
    }
  }

  async deleteSlotsByDay(req: Request, res: Response): Promise<void> {
  try {
    const doctorId = (req as any).user.id;
    const { day } = req.params;

    const deleted = await this.deleteSlot.execute(day, doctorId);

    if (!deleted) {
      res.status(404).json({ message: `No slots found for ${day}` });
      return;
    }

    res.status(200).json({ message: `Slots deleted for ${day}` });
  } catch (err) {
    console.error("Error deleting slots", err);
    res.status(500).json({ message: "Failed to delete slots" });
  }
}



  

}