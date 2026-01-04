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
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
          createdAt: user.createdAt,
        },
        token,
      },
      Message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and password are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
          createdAt: user.createdAt,
        },
        token,
      },
      Message: "User logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};
const getProfile = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const updateProfile = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const changePassword = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export { register, login, getProfile, updateProfile, changePassword };
