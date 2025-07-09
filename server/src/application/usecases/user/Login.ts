import { UserRepository } from "../../../domain/repositories/UserRepository";
import { IUser } from "../../../domain/entities/User";
import bcrypt from "bcryptjs";
import { sendMail } from "../../services/nodeMailerService";
import { generateOtp } from "../../services/OtpSevice";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

export class Login {
  constructor(private userRepo: UserRepository) {}

  async loginUser(
    email: string,
    password: string
  ): Promise<{ message: string; token: string | null; data: Partial<IUser> }> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("invalid crendentials");

    if (user.isBlocked) {
      throw new Error("user is blocked by admin");
    }

    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch) throw new Error("invalid crendentials");

    if (!user.isVerified) {
      const otp = generateOtp();

      // Save OTP in your OTP collection (make sure this method is implemented)
      await this.userRepo.createOtp({ email, otp, createdAt: new Date() });

      // Send OTP via email
      await sendMail(email, otp);

      // Stop login flow
      console.log("please verify your email");

      return { message: "verification required ", token: null, data: user };
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return { message: "login success", token: accessToken, data: user };
  }

  async googleLogin(
    tokenId: string
  ): Promise<{ message: string; token: string; data: Partial<IUser> }> {
    // 1. Verify the token

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) throw new Error("Google token invalid");

    const email = payload.email;
    const name = payload.name || "No Name";
    const googleIds = payload.sub;

    // 2. Check if user exists
    let user = await this.userRepo.findByEmail(email);

      if (user!.isBlocked) {
      throw new Error("user is blocked by admin");
    }

    if (!user) {
      const newUser: Partial<IUser> = {
        email,
        name,
        isVerified: true,
        googleIds,
      };
      const user = await this.userRepo.createUser(newUser);
      console.log(user);
      // 4. Generate your own JWT
      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
      );
      return {
        message: "Google login successful",
        token: accessToken,
        data: user,
      };
    }

    // 4. Generate your own JWT
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return {
      message: "Google login successful",
      token: accessToken,
      data: user,
    };
  }
}
