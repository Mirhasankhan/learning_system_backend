import { Request } from "express";
import { IUploadFile } from "../../interface/file";
import { Course, TCourse } from "./course.model";
import { FileUploadHelper } from "../../helpers/fileUploadHelper";
import AppError from "../../utils/AppError";

const createCourseIntoDB = async (req: Request) => {
  const payload: TCourse = req.body;
  const files = req.files as IUploadFile[];

  const existingCourse = await Course.findOne({ title: payload.title.trim() });
  if (existingCourse) {
    throw new AppError(
      409,
      `Course with title ${payload.title} already exists`
    );
  }

  if (!files || files.length === 0) {
    throw new Error("No files uploaded");
  }
  if (files && files.length > 0) {
    const uploadedMedia = await FileUploadHelper.uploadToCloudinary(files);
    payload.thumbnailUrl = uploadedMedia[0].secure_url;
  }
  if (!payload.thumbnailUrl) {
    throw new AppError(409, "No image Uploaded");
  }
  const course = await Course.create(payload);
  return course;
};

export const courseServices = {
  createCourseIntoDB,
};
