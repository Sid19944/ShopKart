import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";

export const verifySeller = AsyncHandler(async (req, resizeBy, next) => {
  if (req.user.role == "seller" || req.user.role == "admin") {
    next();
  } else {
    return next(
      new ErrorHandler("You are not authorized for Seller Panel", 400),
    );
  }
});
