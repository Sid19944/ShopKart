import { Order_Item } from "../models/order_items.schema.js";
import { Product } from "../models/product.schema.js";
import { Review } from "../models/review.schema.js";
import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";

const addNewReview = AsyncHandler(async (req, res, next) => {
  const user_id = req.user._id;
  const product_id = req.params.product_id;

  const orders = await Order_Item.find({ product_id });
  if (!orders.length) {
    return next(new ErrorHandler("Product have not ourdered yet", 400));
  }
  const user = orders.filter((order) => order.buyer.toString() == user_id);
  if (!user.length) {
    return next(new ErrorHandler("You have not order this product yet", 400));
  }

  const { rating } = req.body;
  if (!rating) {
    return next(new ErrorHandler("Please provide rating", 400));
  }
  const alreadyHaveReview = await Review.find({user_id})
  if(alreadyHaveReview[0]?.product_id == product_id){
    return next(new ErrorHandler("You already give review on this product",400))
  }

  const review = await Review.create({
    user_id: user_id,
    product_id,
    rating,
    review: req.body?.review,
  });
  if (!review) {
    return next(new ErrorHandler("Something went wrong", 500));
  }
  const product = await Product.findByIdAndUpdate(
    product_id,
    {
      $push: {
        reviews: review._id,
      },
    },
    { new: true },
  );
  if (!product) {
    return next(new ErrorHandler("Invalid Product", 400));
  }

  return res.status(201).json({
    success: true,
    message: "New Review Added",
    review,
  });
});

const updateReview = AsyncHandler(async (req, res, next) => {
  const review_id = req.params.review_id;
  const newReview = {
    rating: req.body?.rating,
    review: req.body?.review,
  };
  const checkOwner = await Review.findById(review_id);
  if (checkOwner.user_id.toString() != req.user._id) {
    return next(new ErrorHandler("You are not the Owner of this review", 400));
  }

  const review = await Review.findByIdAndUpdate(review_id, newReview, {
    new: true,
  });
  if (!review) {
    return next(new ErrorHandler("Invalid review ID", 400));
  }
  return res.status(200).json({
    success: true,
    message: "Review Updated",
    review,
  });
});

const deleteReview = AsyncHandler(async (req, res, next) => {
  const review_id = req.params.review_id;
  const checkOwner = await Review.findById(review_id);
  if (!checkOwner) {
    return next(new ErrorHandler("INVALID REVIEW ID", 400));
  }
  if (checkOwner.user_id.toString() != req.user._id) {
    return next(new ErrorHandler("You are not the Owner of this review", 400));
  }
  const review = await Review.findByIdAndDelete(review_id);
  if (!review) {
    return next(new ErrorHandler("Invalid Review ID", 400));
  }

  return res.status(200).json({
    success: true,
    message: "Review Deleted",
  });
});

export { addNewReview, updateReview, deleteReview };
