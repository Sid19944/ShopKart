import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { User } from "../models/user.schema.js";
import { Seller } from "../models/seller.schema.js";
import { Product } from "../models/product.schema.js";
import { Order_Item } from "../models/order_items.schema.js";

const getAllUser = AsyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

const getAllSeller = AsyncHandler(async (req, res, next) => {
  const sellers = await Seller.find();
  if (!sellers.length) {
    return res.status(200).json({
      success: true,
      message: "No Sellers",
    });
  }
  return res.status(200).json({
    success: true,
    sellers,
  });
});

const getSellerRequest = AsyncHandler(async (req, res, next) => {
  const sellers = await Seller.find();
  if (!sellers.length) {
    return res.status(200).json({
      success: true,
      message: "No Sellers",
    });
  }

  const requests = sellers.filter((seller) => seller.isApproved == false);
  if (!requests.length) {
    return res.status(200).json({
      success: true,
      message: "No Sellers Requests",
    });
  }
  return res.status(200).json({
    success: true,
    requests,
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

  const user = await User.findByIdAndUpdate(
    { _id: seller.seller_id },
    {
      $set: {
        role: "seller",
      },
    },
  );

  if (!user) {
    return next(new ErrorHandler("Try Again", 500));
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
  const user = await User.findByIdAndUpdate(
    { _id: seller.seller_id },
    {
      $set: {
        role: "user",
      },
    },
  );

  if (!user) {
    return next(new ErrorHandler("Try Again", 500));
  }
  return res.status(200).json({
    success: true,
    message: "Seller Bock to Sell",
  });
});

const blockProduct = AsyncHandler(async (req, res, next) => {
  const product_id = req.params.product_id;
  const product = await Product.findByIdAndUpdate(product_id, {
    $set: {
      isApproved: false,
    },
  });
  if (!product) {
    return next(new ErrorHandler("Invalid Product ID", 400));
  }
  return res.status(200).json({
    success: true,
    message: "Product Not Allow",
  });
});

const approveProduct = AsyncHandler(async (req, res, next) => {
  const product_id = req.params.product_id;
  const product = await Product.findByIdAndUpdate(product_id, {
    $set: {
      isApproved: true,
    },
  });
  if (!product) {
    return next(new ErrorHandler("Invalid Product ID", 400));
  }
  return res.status(200).json({
    success: true,
    message: "Product now Allow",
  });
});

const orderDetails = AsyncHandler(async (req, res, next) => {
  const orders = await Order_Item.find();
  const orderDelivered = orders.filter(
    (item) => item.order_status == "delivered",
  );

  return res.status(200).json({
    success: true,
    numberOfProductOrdered: orders.length,
    numberOfProductDelivered: orderDelivered.length,
  });
});
export {
  getSellerRequest,
  getAllUser,
  approveSeller,
  blockSeller,
  blockProduct,
  approveProduct,
  orderDetails,
};
