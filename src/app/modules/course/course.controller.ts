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

export const courseController = {
  createCourse,
};
