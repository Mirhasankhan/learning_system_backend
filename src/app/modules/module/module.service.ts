import AppError from "../../utils/AppError";
import { Course } from "../course/course.model";
import { Module, TModule } from "./module.model";

const createModuleIntoDB = async (payload: TModule) => {
  const existingCourse = await Course.findOne({
    _id: payload.courseId,
  });
  if (!existingCourse) {
    throw new AppError(404, "No course found");
  }
  const existingModule = await Module.findOne({
    courseId: payload.courseId,
    title: payload.title.trim(),
  });

  if (existingModule) {
    throw new AppError(
      409,
      `Module with title ${payload.title} already exists in this course`
    );
  }

  const newModule = await Module.create(payload);
  return newModule;
};

export const moduleServices = {
  createModuleIntoDB,
};
