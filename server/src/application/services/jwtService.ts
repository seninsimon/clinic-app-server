import jwt from "jsonwebtoken";
interface JwtService {
  generateToken(payload: object): string;
}


export class JwtServiceImpl implements JwtService {
  generateToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
  }
}
