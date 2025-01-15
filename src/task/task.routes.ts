import { Router } from "express";
import * as TaskController from "./task.controller";
import * as TaskValidator from "./task.validator";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
const router = Router();

router
  .post(
    "/create",
    roleAuth(["ADMIN"]),
    TaskValidator.createTask,
    catchError,
    TaskController.createTask
  )
  .patch(
    "/:id",
    roleAuth(["USER"]),
    TaskValidator.changeTaskStatus,
    catchError,
    TaskController.taskStatusChange
  )
  .get("/my", roleAuth(["USER"]), TaskController.getUserTask);

export default router;
