import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email is already registered" });
    }
    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {};
const getProfile = async (req, res, next) => {};
const updateProfile = async (req, res, next) => {};
const changePassword = async (req, res, next) => {};
export { register, login, getProfile, updateProfile, changePassword };
