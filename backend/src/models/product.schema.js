import mongoose, { Schema } from "mongoose";

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
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);
