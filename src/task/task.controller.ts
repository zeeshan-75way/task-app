import { Request, Response } from "express";
import * as TaskService from "./task.service";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.helper";
import { IUser } from "../users/user.dto";

/**
 * create task
 * @route POST /task/create
 * @access private
 * @returns task
 */
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  //create task in database
  const result = await TaskService.createTask(req.body);
  res.send(createResponse(result, "Task Created Successfully"));
});
/**
 * change task status
 * @route PATCH /task/:id
 * @access private
 * @returns task
 */

export const taskStatusChange = asyncHandler(
  async (req: Request, res: Response) => {
    //check if task exists
    const task = await TaskService.getTaskById(req.params.id);
    //if task does not exist then throw error
    if (!task) {
      throw new Error("Task not found");
    }
    //if task is not assigned to user and he is changing its status then throw error
    if (task.assignedTo.toString() !== (req.user as IUser)._id.toString()) {
      throw new Error("Unauthorized access");
    }

    //change task status
    const result = await TaskService.changeTaskStatus(
      req.params.id,
      req.body.status
    );
    res.send(createResponse(result, "Task Status Changed Successfully"));
  }
);
/**
 * get user task
 * @route GET /task/my
 * @access private
 * @returns task
 */
export const getUserTask = asyncHandler(async (req: Request, res: Response) => {
  //get user id from logged in user
  const userId = (req.user as IUser)?._id;
  //get user task
  const result = await TaskService.getUserTask(userId);
  //if no task then throw error
  if (result.length <= 0) {
    throw new Error("No task found");
  }
  res.send(createResponse(result, "Task Fetched Successfully"));
});
