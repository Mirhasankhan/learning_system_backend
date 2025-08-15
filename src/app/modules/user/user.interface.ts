import { Types, Document } from "mongoose";

export interface TUser extends Document {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  otp: string;
  role: string;
  expiresAt: Date;
  unlockedLectures: any;
}
