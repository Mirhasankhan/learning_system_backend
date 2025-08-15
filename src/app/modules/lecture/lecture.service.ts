import AppError from "../../utils/AppError";
import { Module } from "../module/module.model";
import { Lecture, TLecture } from "./lecture.model";

const createLectureIntoDB = async (payload: TLecture) => {
  const existingModule = await Module.findOne({
    _id: payload.moduleId,
  });

  if (!existingModule) {
    throw new AppError(404, `Module not found`);
  }

  const newLecture = await Lecture.create({
    ...payload,
    courseId: existingModule.courseId,
  });
  return newLecture;
};

export const lectureServices = {
  createLectureIntoDB,
};
