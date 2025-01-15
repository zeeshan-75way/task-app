import { body, param } from "express-validator";

export const createTask = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),
  body("status")
    .notEmpty()
    .withMessage("status is required")
    .isString()
    .withMessage("status must be a string"),
  body("assignedTo")
    .notEmpty()
    .withMessage("assignedTo is required")
    .isString(),
];

export const changeTaskStatus = [
  param("id").notEmpty().withMessage("id is required"),
  body("status")
    .notEmpty()
    .withMessage("status is required")
    .isString()
    .withMessage("status must be a string"),
];
