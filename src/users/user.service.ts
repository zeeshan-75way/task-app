import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
/**
 * Creates a new user.
 * @param data - The user data to create the user with.
 * @returns A promise that resolves to the newly created user object.
 */
export const createUser = async (data: IUser) => {
  const result = await UserSchema.create({ ...data });
  return result;
};
/**
 * Retrieves a user by their email address.
 * @param email - The email address of the user to retrieve.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */

export const getUserByEmail = async (email: string) => {
  const result = await UserSchema.findOne({ email: email }).lean();
  return result;
};

/**
 * Retrieves all users in the database.
 * @returns A promise that resolves to an array of user objects without their passwords.
 */
export const getAllUsers = async () => {
  const result = await UserSchema.find({ role: "USER" })
    .select("-password")
    .lean();
  return result;
};

/**
 * Generates a JSON Web Token for a user.
 * @param _id - The user's unique identifier.
 * @param role - The user's role.
 * @returns A JSON Web Token.
 */
export const generateToken = function (_id: string, role: string) {
  const token = jwt.sign({ _id: _id, role: role }, process.env.JWT_SECRET!);
  return token;
};
/**
 * Compares a plaintext password with a hashed password.
 * @param password - The plaintext password to compare.
 * @param userPassword - The hashed password to compare with.
 * @returns A promise that resolves to a boolean value indicating whether the passwords match.
 */
export const comparePassword = async ({
  password,
  userPassword,
}: {
  password: string;
  userPassword: string;
}) => {
  return await bcrypt.compare(password, userPassword);
};
