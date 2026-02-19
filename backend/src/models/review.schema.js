import mongoose, { Schema } from "mongoose";
import { Product } from "./product.schema.js";

const reviewSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
  },
});

reviewSchema.post("findOneAndDelete", async (review) => {
  console.log(review);
  const product = await Product.findByIdAndUpdate(
    review.product_id,
    {
      $pull: {
        reviews: review._id,
      },
    },
    { new: true },
  );

  console.log(product);
});

export const Review = mongoose.model("Review", reviewSchema);
