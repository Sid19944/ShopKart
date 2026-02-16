import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { Product } from "../models/product.schema.js";
import { v2 as cloudinary } from "cloudinary";
import httpStatus from "http-status-codes";

const getSellerProduct = AsyncHandler(async (req, res, next) => {
  const products = await Product.find({ seller: req.user._id });
  return res.status(200).json({
    success: true,
    products,
  });
});

const updateOrderStatus = AsyncHandler(async (req, res, next) => {});

export { getSellerProduct };
