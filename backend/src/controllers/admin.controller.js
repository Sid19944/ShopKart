import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { User } from "../models/user.schema.js";
import { Seller } from "../models/seller.schema.js";

const updateUserRole = AsyncHandler(async (req, res, next) => {
  const { userid } = req.params;
  const user = await User.findByIdAndUpdate(
    userid,
    {
      role: req.body.role,
    },
    { new: true },
  );

  res.json(user);
});

const getAllUser = AsyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

const approveSeller = AsyncHandler(async (req, res, next) => {
  const seller_id = req.params.seller_id;
  const seller = await Seller.findByIdAndUpdate(seller_id, {
    $set: {
      isApproved: true,
    },
  });

  if (!seller) {
    return next(new ErrorHandler("Invalid Seller ID", 400));
  }
  return res.status(200).json({
    success: true,
    message: "Seller Approved to Sell",
  });
});

const blockSeller = AsyncHandler(async (req, res, next) => {
  const seller_id = req.params.seller_id;
  const seller = await Seller.findByIdAndUpdate(seller_id, {
    $set: {
      isApproved: false,
    },
  });

  if (!seller) {
    return next(new ErrorHandler("Invalid Seller ID", 400));
  }
  return res.status(200).json({
    success: true,
    message: "Seller Bock to Sell",
  });
});

export { updateUserRole, getAllUser, approveSeller, blockSeller };
