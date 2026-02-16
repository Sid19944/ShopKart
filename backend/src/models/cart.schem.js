import mongoose, { Schema } from "mongoose";
import { Product } from "./product.schema";

const cartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    requierd: true,
  },
  items: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        requierd: true,
      },
      quentity: {
        type: Number,
        requierd: true,
        min: 1,
      },
    },
  ],
  total_price: {
    type: Number,
    requierd: true,
  },
});

export const Cart = mongoose.model("Cart", cartSchema);
