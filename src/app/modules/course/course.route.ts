import Express from "express";
import { courseController } from "./course.controller";
import { FileUploadHelper } from "../../helpers/fileUploadHelper";
import { parseBodyData } from "../../middleware/parseBodyData";

const router = Express.Router();

router.post(
  "/create",
  FileUploadHelper.upload.array("thumbnailUrl", 1),
  parseBodyData,
  courseController.createCourse
);

export const courseRoutes = router;
