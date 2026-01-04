import express from "express";
import { body, validationResult } from "express-validator";
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";
import protect from "../middlewares/auth.js";
const authRouter = express.Router();
const validateRegistration = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 7 })
    .withMessage("Username can be maximum 7 characters long"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
authRouter.post("/register", validateRegistration, register);
authRouter.post("/login", validateLogin, login);
authRouter.get("/profile", protect, getProfile);
authRouter.put("/profile", protect, updateProfile);
authRouter.put("/change-password", protect, changePassword);

export default authRouter;
