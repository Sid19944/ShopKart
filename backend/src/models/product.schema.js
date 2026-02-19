import mongoose, { Schema } from "mongoose";
import { Review } from "./review.schema.js";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    stock: { type: Number, default: 1 },
    discount: Number,
    category: {
      type: String,
      enum: ["fashon", "mobile", "electronics"],
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

productSchema.post("findOneAndDelete", async (product) => {
  await Review.deleteMany({ product_id: product._id });
  console.log("all review deleted for thsis product");
});

export const Product = mongoose.model("Product", productSchema);
