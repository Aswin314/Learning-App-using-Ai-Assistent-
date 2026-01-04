import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.autherization &&
    req.headers.autherization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.autherization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          error: "Your token has expired. Please log in again.",
        });
      }
      return res
        .status(401)
        .json({ success: false, error: "Not authorized, token failed" });
    }
  }
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Not authorized, no token" });
  }
};
export default protect;
