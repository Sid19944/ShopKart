import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique : true,
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
