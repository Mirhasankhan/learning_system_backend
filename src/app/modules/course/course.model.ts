import mongoose, { Schema, Document } from "mongoose";

export interface TCourse {
  title: string;
  price: number;
  description: string;
  thumbnailUrl: string;
}

const CourseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique:true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Course = mongoose.model<TCourse>("Course", CourseSchema);
