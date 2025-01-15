import { Router } from "express";
import userRoutes from "./users/user.routes";
import taskRoutes from "./task/task.routes"
const router = Router();

router.use("/users", userRoutes);
router.use("/task", taskRoutes);


export default router;