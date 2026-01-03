
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    statusCode = 400;
    message = `Duplicate value for field: ${field}`;
  }
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }
  if (err.name === "Limit_File_Size") {
    statusCode = 400;
    message = "File size exceeds the limit";
  }
  if (err.name === "jsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  }
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your token has expired. Please log in again.";
  }
  console.error("error", {
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
  res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
export default errorHandler;
