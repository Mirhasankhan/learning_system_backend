import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const course = await courseServices.createCourseIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Course created Successfully",
    data: course,
  });
});
const allCourses = catchAsync(async (req, res) => {
  const course = await courseServices.getAllCourseFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Courses retrieved Successfully",
    data: course,
  });
});
const getCourse = catchAsync(async (req, res) => {
  const course = await courseServices.getSingleCourseFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Course retrieved Successfully",
    data: course,
  });
});


export const courseController = {
  createCourse,
  allCourses,
  getCourse
};
