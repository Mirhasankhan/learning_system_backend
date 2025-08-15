import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoute } from "../modules/user/user.route";
import { courseRoutes } from "../modules/course/course.route";
import { moduleRoute } from "../modules/module/module.route";
import { lectureRoute } from "../modules/lecture/lecture.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/course",
    route: courseRoutes,
  },
  {
    path: "/module",
    route: moduleRoute,
  },
  {
    path: "/lecture",
    route: lectureRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
