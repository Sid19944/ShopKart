import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { Product } from "../models/product.schema.js";
import { v2 as cloudinary } from "cloudinary";
import httpStatus from "http-status-codes";
import { Seller } from "../models/seller.schema.js";
import { Order_Item } from "../models/order_items.schema.js";

import redisClient from "../utils/redis.js";
import { Address } from "../models/address.schema.js";

const wantSeller = AsyncHandler(async (req, res, next) => {
  const { storeName, storeAddress } = req.body;
  if (!storeName || !storeAddress) {
    return next(new ErrorHandler("Provide store name and address", 400));
  }
  if ([storeName, storeAddress].some((item) => item.trim() == "")) {
    return next(new ErrorHandler("Provide store name and address", 400));
  }
  const seller = await Seller.create({
    seller_id: req.user._id,
    storeName,
    storeAddress,
  });
  return res.status(200).json({
    success: true,
    message: "Seller Request Submitted, please wait for approval",
    seller,
  });
});

const updateSeller = AsyncHandler(async (req, res, next) => {
  const seller_id = req.params.seller_id;

  const newData = {
    storeName: req.body?.storeName,
    storeAddress: req.body?.storeAddress,
  };

  const seller = await Seller.findByIdAndUpdate(seller_id, newData, {
    new: true,
  });

  if (!seller) {
    return next(new ErrorHandler("Invalid Data", 400));
  }
  return res.status(200).json({
    success: true,
    message: newData.storeName ? "Store Name Updated" : "Store Address Updated",
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

const getOverviewInfo = AsyncHandler(async (req, res, next) => {
  const seller_id = req.seller._id;
  const cacheKey = `overviewInfo:${seller_id}:"overview"`;
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  const tOrders = await Order_Item.find({
    product_id: { $in: req.seller.products },
  });

  const tProducts = await Product.find({
    _id: { $in: req.seller.products },
  });

  const lastThirtyDay =
    new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000;

  let totalSales = 0;
  let lastThirtyDaySales = 0;
  tOrders?.map((item) => {
    totalSales += item.quentity;
  });
  tOrders
    ?.filter(
      (orderItem) =>
        new Date(orderItem.createdAt).setHours(0, 0, 0, 0) >= lastThirtyDay,
    )
    ?.map((item) => {
      lastThirtyDaySales += item.quentity;
    });

  const lastThirtyDayProducts = tProducts?.filter(
    (product) =>
      new Date(product.createdAt).setHours(0, 0, 0, 0) >= lastThirtyDay,
  ).length;

  // calculate revenue start
  let totalRevenue = 0;
  let lastThirtyDayRevenue = 0;
  tOrders?.map((item) => (totalRevenue += item.itemPrice * item.quentity));
  tOrders
    ?.filter(
      (item) => new Date(item.createdAt).setHours(0, 0, 0, 0) >= lastThirtyDay,
    )
    ?.map((item) => (lastThirtyDayRevenue += item.itemPrice * item.quentity));
  // calculation revenue end

  const data = {
    totalProduct: tProducts.length,
    lastThirtyDayProducts,
    totalSales: totalSales,
    lastThirtyDaySales,
    totalRevenue: totalRevenue,
    lastThirtyDayRevenue,
  };

  await redisClient.set(cacheKey, JSON.stringify(data), { EX: 10 * 60 });

  return res.status(200).json({
    success: true,
    data,
  });
});

const getMonthlyReport = AsyncHandler(async (req, res, next) => {
  const seller_id = req.seller._id.toString();
  const year = new Date().getFullYear();

  const cacheKey = `monthlyReport:${seller_id}:${year}`;
  // check redis
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  const revenueAndSaleReport = await Order_Item.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lte: new Date(`${year}-12-31T23:59:59.999Z`),
        },
        seller_id: req.seller._id,
      },
    },
    {
      $facet: {
        revenueReport: [
          {
            $group: {
              _id: { $month: "$createdAt" },
              totalPrice: {
                $sum: { $multiply: ["$itemPrice", "$quentity"] },
              },
            },
          },
        ],
        saleReport: [
          {
            $group: {
              _id: { $month: "$createdAt" },
              totalSales: { $sum: "$quentity" },
            },
          },
        ],
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
        seller: req.seller._id,
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalProduct: { $sum: 1 },
      },
    },
  ]);

  revenueAndSaleReport[0].productReport = productReport;
  const monthlyReport = revenueAndSaleReport;

  // Store in Redis (Expire after 10 minutes)
  await redisClient.set(cacheKey, JSON.stringify(monthlyReport[0]), {
    EX: 10 * 60,
  });
  return res.status(200).json(monthlyReport[0]);
});

const getCurrSeller = AsyncHandler(async (req, res, next) => {
  return res.status(200).json({ success: true, seller: req.seller });
});

export {
  getSellerProduct,
  wantSeller,
  getOverviewInfo,
  getMonthlyReport,
  getCurrSeller,
  updateSeller
};
