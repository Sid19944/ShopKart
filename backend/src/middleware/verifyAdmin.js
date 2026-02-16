import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";

export const verifyAdmin = AsyncHandler(async (req, res, next) => {
  if (req.user.role == "admin") {
    next();
  } else {
    return next(new ErrorHandler("You not Authorized for admin Panel", 400));
  }
});
