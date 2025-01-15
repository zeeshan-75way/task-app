import * as UserService from "./user.service";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
/**
 * create user
 * @route POST /user/register
 * @access public
 * @returns user
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const existingUser = await UserService.getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  const result = await UserService.createUser(req.body);
  res.send(createResponse(result, "User Created Successfully"));
});

/**
 * login user
 * @route POST /user/login
 * @access public
 * @returns user
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserService.getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await UserService.comparePassword({
    password,
    userPassword: user.password,
  });
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const token = await UserService.generateToken(user._id, user.role);
  res
    .cookie("token", token)
    .send(createResponse({ token }, "Login Successfully"));
});

/**
 * Retrieves all users in the database.
 * @route GET /user/all
 * @access private
 */
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  res.send(createResponse(result, "Users Fetched Successfully"));
});
