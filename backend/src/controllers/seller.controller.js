import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { Product } from "../models/product.schema.js";
import { v2 as cloudinary } from "cloudinary";
import httpStatus from "http-status-codes";
import { Seller } from "../models/seller.schema.js";

const wantSeller = AsyncHandler(async (req, res, next) => {
  const { storeName, storeAddress } = req.body;
  if (!storeName || !storeAddress) {
    return next(new ErrorHandler("Provide store name and address", 400));
  }
  if ([storeName, storeAddress].some((item) => item.trim() == "")) {
    return next(new ErrorHandler("Provide store name and address", 400));
  }
  const seller = await Seller.create({
    seller_Id: req.user._id,
    storeName,
    storeAddress,
  });
  return res.status(200).json({
    success: true,
    message: "Seller Request Submitted, please wait for approval",
    seller,
  });
});

const getSellerProduct = AsyncHandler(async (req, res, next) => {
  const page_no = req.params.page_no;

  const tp = await Product.find();
  const products = await Product.find({ seller: req.seller._id })
    .populate([
      {
        path: "seller",
      },
      {
        path: "reviews",
        populate: {
          path: "user_id",
        },
      },
    ])
    .limit(10)
    .skip((page_no - 1) * 10);

  return res.status(200).json({
    success: true,
    products,
    totalProduct: tp.length,
  });
});

export { getSellerProduct, wantSeller };
