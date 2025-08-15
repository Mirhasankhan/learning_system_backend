import Express from "express";
import { moduleController } from "./module.controller";

const router = Express.Router();

router.post("/create", moduleController.createModule);

export const moduleRoute = router;
