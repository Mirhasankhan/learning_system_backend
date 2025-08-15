import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { Course } from "../course/course.model";
import { Module } from "../module/module.model";
import { Lecture } from "../lecture/lecture.model";

export const role = {
  admin: "Admin",
  user: "User",
};

const userSchema = new Schema<TUser>(
  {
    fullName: { type: String, required: [true, "Fullname is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please fill a valid email address",
      ],
    },
    password: { type: String, required: [true, "Password is required"] },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    unlockedLectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre<TUser>("save", async function (next) {
  if (this.isNew) {
    const firstCourse = await Course.findOne().sort({ createdAt: 1 });
    if (firstCourse) {
      const firstModule = await Module.findOne({
        courseId: firstCourse._id,
      }).sort({ moduleNumber: 1 });

      if (firstModule) {
        const firstLecture = await Lecture.findOne({
          moduleId: firstModule._id,
        }).sort({ lectureNumber: 1 });

        if (firstLecture) {
          this.unlockedLectures = [firstLecture._id];
        }
      }
    }
  }
  next();
});

export const User = model<TUser>("User", userSchema);

const pendingUserSchema = new Schema<TUser>(
  {
    fullName: { type: String, required: [true, "Fullname is required"] },
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String, required: [true, "Password is required"] },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    otp: { type: String },
    expiresAt: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const PendingUser = model<TUser>("PendingUser", pendingUserSchema);

const otpSchema = new Schema<TUser>(
  {
    email: { type: String, required: [true, "Email is required"] },
    otp: { type: String },
    expiresAt: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Otp = model<TUser>("Otp", otpSchema);
