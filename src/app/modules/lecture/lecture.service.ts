import AppError from "../../utils/AppError";
import { Course } from "../course/course.model";
import { Module } from "../module/module.model";
import { User } from "../user/user.model";
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

const unlockNextLecture = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "user not found");
  }
  const lastUnlockedId =
    user.unlockedLectures[user.unlockedLectures.length - 1];

  const lastLecture = await Lecture.findById(lastUnlockedId);
  if (!lastLecture) {
    throw new AppError(404, "lecture not found");
  }

  let nextLecture = await Lecture.findOne({
    moduleId: lastLecture.moduleId,
    lectureNumber: lastLecture.lectureNumber + 1,
  });

  if (!nextLecture) {
    const currentModule = await Module.findById(lastLecture.moduleId);

    if (!currentModule) {
      throw new AppError(404, "module not found");
    }

    const nextModule = await Module.findOne({
      courseId: currentModule.courseId,
      moduleNumber: currentModule.moduleNumber + 1,
    });

    if (nextModule) {
      nextLecture = await Lecture.findOne({ moduleId: nextModule._id }).sort({
        lectureNumber: 1,
      });
    } else {
      const currentCourse = await Course.findById(currentModule.courseId);
      if (!currentCourse) {
        throw new AppError(404, "lecture not found");
      }
      const nextCourse = await Course.findOne({
        _id: { $gt: currentCourse._id },
      }).sort({ _id: 1 });

      if (nextCourse) {
        const firstModule = await Module.findOne({
          courseId: nextCourse._id,
        }).sort({ moduleNumber: 1 });
        if (!firstModule) {
          throw new AppError(404, "lecture not found");
        }
        nextLecture = await Lecture.findOne({ moduleId: firstModule._id }).sort(
          { lectureNumber: 1 }
        );
      }
    }
  }

  if (!nextLecture) {
    return;
  }

  user.unlockedLectures.push(nextLecture._id);
  const updatedLecture = await user.save();

  return updatedLecture;
};

const getMyLectures = async (userId: string) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("unlockedLectures");

  return user;
};

const getLectureDetailsFromDb = async (lectureId: string) => {
  const lecture = await Lecture.findById(lectureId).lean();
  if(!lecture){
    throw new AppError(404, "Lecture not found")
  }
  return lecture
};
export const lectureServices = {
  createLectureIntoDB,
  unlockNextLecture,
  getMyLectures,
  getLectureDetailsFromDb
};
