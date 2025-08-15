import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { lectureServices } from "./lecture.service";

const createLecture = catchAsync(async (req, res) => {
  const lecture = await lectureServices.createLectureIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Lecture created Successfully",
    data: lecture,
  });
});

export const lectureController = {
  createLecture,
};
