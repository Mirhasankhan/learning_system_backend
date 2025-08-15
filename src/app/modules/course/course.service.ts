import { Request } from "express";
import { IUploadFile } from "../../interface/file";
import { Course, TCourse } from "./course.model";
import { FileUploadHelper } from "../../helpers/fileUploadHelper";
import AppError from "../../utils/AppError";
import { Module } from "../module/module.model";
import { Lecture } from "../lecture/lecture.model";

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

const getAllCourseFromDB = async () => {
  const courses = await Course.find().lean();
  return courses;
};

const getSingleCourseFromDB = async (courseId: string) => { 
  const existingCourse = await Course.findById(courseId, { title: 1 }).lean();

  if (!existingCourse) {
    throw new AppError(404, "Course not found");
  }
 
  const modules = await Module.find({ courseId }, { __v: 0, createdAt: 0, updatedAt: 0 })
    .sort({ moduleNumber: 1 })
    .lean();
 
  const modulesWithLectures = await Promise.all(
    modules.map(async (mod) => {
      const lectures = await Lecture.find(
        { moduleId: mod._id },
        { __v: 0, createdAt: 0, updatedAt: 0 }
      )
        .sort({ lectureNumber: 1 })
        .lean();

      return {
        ...mod,
        lectures,
      };
    })
  );

  return {
    ...existingCourse,
    modules: modulesWithLectures,
  };
};



export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB
};
