export interface IUser {
  _id?: string; // Use string instead of Object for compatibility with MongoDB ObjectId as string
  name: string;
  email: string;
  password?: string; // Optional for OAuth users
  phone?: string;
  gender:'male' | 'female' ;
  isVerified : boolean ;
  googleIds?: string | null;
  isBlocked: boolean;
  googleVerified?: boolean;
  role: "admin" | "patient" | "doctor";
  profilePicture : string;
}
