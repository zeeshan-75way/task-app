import { type ITask } from "./task.dto";

import TaskSchema from "./task.schema";

/**
 * Creates a new task in the database.
 * @param data - The task data to create the task with.
 * @returns A promise that resolves to the newly created task object.
 */

export const createTask = async (data: ITask) => {
  const result = await TaskSchema.create({ ...data });
  return result;
};

/**
 * Changes the status of a task in the database.
 * @param taskId - The unique identifier of the task to change.
 * @param status - The new status of the task.
 * @returns A promise that resolves to the updated task object.
 */
export const changeTaskStatus = async (taskId: string, status: string) => {
  const result = await TaskSchema.findByIdAndUpdate(
    { _id: taskId },
    { status: status },
    { new: true, runValidators: true }
  );
  return result;
};

/**
 * Retrieves a task by its unique identifier.
 * @param taskId - The unique identifier of the task to retrieve.
 * @returns A promise that resolves to the task object if found, or null if not found.
 */
export const getTaskById = async (taskId: string) => {
  const result = await TaskSchema.findById({ _id: taskId });
  return result;
};

/**
 * Deletes a task by its unique identifier.
 * @param taskId - The unique identifier of the task to delete.
 * @returns A promise that resolves to the deleted task object if found, or null if not found.
 */

export const deleteTask = async (taskId: string) => {
  const result = await TaskSchema.findByIdAndDelete({ _id: taskId });
  return result;
};

export const getUserTask = async (userId: string) => {
  const result = await TaskSchema.find({ assignedTo: userId });
  return result;
};
