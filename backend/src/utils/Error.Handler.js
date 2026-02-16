class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.Message = err.message || "Something went wrong";
  err.statusCode = err.statusCode || 500;

  if (err.name === " TokenExpiredError") {
    const message = "JSON web token expired";
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "Invalid Signature";
    err = new ErrorHandler(message, 400);
  }

  const errMessage = err.erros
    ? Object.values(err.error)
        .map((err) => err.message)
        .join(",")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errMessage,
  });
};

export default ErrorHandler;
