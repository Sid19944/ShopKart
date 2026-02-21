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

// const getSingleUser = AsyncHandler(async (req, res, next) => {
//   const user_id = req.params.user_id;
//   const user = await User.findById(user_id);
//   if (!user) {
//     return next(new ErrorHandler("Invalid User ID", 400));
//   }

//   return res.status(200).json({
//     success: true,
//     user,
//   });
// });

const approveUser = AsyncHandler(async (req, res, next) => {
  const user_id = req.params.user_id;
  const user = await User.findByIdAndUpdate(user_id, {
    $set: {
      isApproved: true,
    },
  });

  if (!user) {
    return next(new ErrorHandler("Try Again", 500));
  }
  return res.status(200).json({
    success: true,
    message: "User Approved",
  });
});

const blockUser = AsyncHandler(async (req, res, next) => {
  const user_id = req.params.user_id;
  const user = await User.findByIdAndUpdate(user_id, {
    $set: {
      isApproved: false,
    },
  });

  if (user.role == "admin") {
    const user = await User.findByIdAndUpdate(user_id, {
      $set: {
        isApproved: true,
      },
    });
    return next(new ErrorHandler("You can't block admin", 500));
  }
  await Seller.findOneAndUpdate(
    { seller_id: user_id },
    {
      $set: {
        isApproved: false,
      },
    },
  );

  if (!user) {
    return next(new ErrorHandler("Try Again", 500));
  }
  return res.status(200).json({
    success: true,
    message: "User Blocked",
  });
});

const getAllSeller = AsyncHandler(async (req, res, next) => {
  const sellers = await Seller.find();
  if (!sellers.length) {
    return next(new ErrorHandler("No Seller"));
  }
  return res.status(200).json({
    success: true,
    sellers,
  });
});

const getAllProducts = AsyncHandler(async (req, res, next) => {
  const products = await Product.find().populate("reviews").populate("seller");
  if (!products.length) {
    return next(new ErrorHandler("No Product's"));
  }

  return res.status(200).json({
    success: true,
    products,
  });
});

const getSellerRequest = AsyncHandler(async (req, res, next) => {
  const sellers = await Seller.find();
  if (!sellers.length) {
    return next(new ErrorHandler("No Seller"));
  }

  const requests = sellers.filter((seller) => seller.isApproved == false);

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
    message: "Seller Block to Sell",
  });
});

const blockProduct = AsyncHandler(async (req, res, next) => {
  const product_id = req.params.product_id;
  console.log(product_id);
  console.time("S");
  const product = await Product.findByIdAndUpdate(
    product_id,
    {
      $set: {
        isApproved: false,
      },
    },
    { new: true },
  );
  console.timeEnd("S");
  if (!product) {
    return next(new ErrorHandler("Invalid Product ID", 400));
  }
  return res.status(200).json({
    success: true,
    message: "Product Not Allow",
    product,
  });
});

const approveProduct = AsyncHandler(async (req, res, next) => {
  const product_id = req.params.product_id;
  const product = await Product.findByIdAndUpdate(
    product_id,
    {
      $set: {
        isApproved: true,
      },
    },
    { new: true },
  );
  if (!product) {
    return next(new ErrorHandler("Invalid Product ID", 400));
  }
  return res.status(200).json({
    success: true,
    message: "Product now Allow",
    product,
  });
});

const allOrder_items = AsyncHandler(async (req, res, next) => {
  const order_items = await Order_Item.find().populate("buyer");
  if (!order_items.length) {
    return next(new ErrorHandler("No Product ourder yet"));
  }

  return res.status(200).json({
    success: true,
    order_items,
  });
});

const getReportByMonth = AsyncHandler(async (req, res, next) => {
  const year = new Date().getFullYear();

  const revenueReport = await Order_Item.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lte: new Date(`${year}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" }, // separates by month
        totalPrice: {
          $sum: { $multiply: ["$itemPrice", "$quentity"] },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const userReport = await User.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lte: new Date(`${year}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalUser: {
          $sum: 1,
        },
      },
    },
  ]);

  const sellerReport = await Seller.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lte: new Date(`${year}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalSeller: { $sum: 1 },
      },
    },
  ]);

  const saleReport = await Order_Item.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lte: new Date(`${year}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalQtySale: { $sum: "$quentity" },
      },
    },
  ]);

  const productReport = await Product.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lte: new Date(`${year}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalProduct: { $sum: 1 },
      },
    },
  ]);

  return res.status(200).json({
    success: true,
    revenueReport,
    userReport,
    sellerReport,
    saleReport,
    productReport,
  });
});

export {
  getSellerRequest,
  getAllUser,
  // getSingleUser,
  approveUser,
  blockUser,
  getAllSeller,
  approveSeller,
  blockSeller,
  getAllProducts,
  blockProduct,
  approveProduct,
  allOrder_items,
  getReportByMonth,
};
