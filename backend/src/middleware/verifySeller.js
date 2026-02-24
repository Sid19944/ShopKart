import { Seller } from "../models/seller.schema.js";
import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";

export const verifySeller = AsyncHandler(async (req, res, next) => {
  if (req.user.role == "seller" || req.user.role == "admin") {
    const seller = await Seller.findOne({ seller_id: req.user._id });
    req.seller = seller;

    next();
  } else {
    return next(
      new ErrorHandler("You are not authorized for Seller Panel", 400),
    );
  }
});
