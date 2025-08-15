import Express from "express";
import { lectureController } from "./lecture.controller";
import auth from "../../middleware/auth";

const router = Express.Router();

router.post("/create", lectureController.createLecture);
router.get("/unblocked",auth("User"), lectureController.getMyLectures);
router.post("/unblock",auth("User"), lectureController.unlockLecture);

export const lectureRoute = router;
