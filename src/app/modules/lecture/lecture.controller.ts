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
const getMyLectures = catchAsync(async (req, res) => {
  const lectures = await lectureServices.getMyLectures(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Unblocked lectures retrieved Successfully",
    data: lectures,
  });
});
const unlockLecture = catchAsync(async (req, res) => {
  const updated = await lectureServices.unlockNextLecture(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Unblocked lectures retrieved Successfully",
    data: updated,
  });
});

export const lectureController = {
  createLecture,
  getMyLectures,
  unlockLecture
};
