import Express from "express";
import { lectureController } from "./lecture.controller";

const router = Express.Router();

router.post("/create", lectureController.createLecture);

export const lectureRoute = router;
