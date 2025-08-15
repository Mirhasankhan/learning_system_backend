import { Types } from "mongoose";

export type TUser = {
  _id?: Types.ObjectId;
  fullName: string;
  email: string; 
  password: string;
  otp: string; 
  role: string;
  expiresAt: Date;
};
