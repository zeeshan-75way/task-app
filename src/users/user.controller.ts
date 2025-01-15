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
  //Check if user already exists
  const existingUser = await UserService.getUserByEmail(email);
  //if already exists then throw error
  if (existingUser) {
    throw new Error("User already exists");
  }
  //if no error then create a user object in database
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
  //check if user does not exist
  const user = await UserService.getUserByEmail(email);
  //if not exist then throw an error
  if (!user) {
    throw new Error("User not found");
  }
  //check if password is valid
  const isPasswordValid = await UserService.comparePassword({
    password,
    userPassword: user.password,
  });
  //if password is not valid then throw an error
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  //if password is valid then generate a token and send token in cookies to validate
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
  //get all users from database with USER role
  const result = await UserService.getAllUsers();
  //send the response array
  res.send(createResponse(result, "Users Fetched Successfully"));
});
