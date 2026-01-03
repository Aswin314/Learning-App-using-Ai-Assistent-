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
const router = express.Router();
const validateRegistration = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .length({ max: 7 })
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
router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
export default router;
