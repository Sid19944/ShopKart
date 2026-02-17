import mongoose, { Schema } from "mongoose";

const shippingAddressSchema = new Schema(
  {
    fullName: { type: String, required: true },
    addressLine: { type: String, required: true },
    pincode: { type: Number, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    postOffice: { type: String, required: true },
  },
  { _id: false },
);

const order_itemSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quentity: {
    type: Number,
    min: 1,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  order_status: {
    type: String,
    enum: ["pending", "processing", "shipped", "out for delivery", "delivered"],
    default: "pending",
  },
  shippingAddress: {
    type: shippingAddressSchema,
    required: true,
  },
});

export const Order_Item = mongoose.model("Order_Item", order_itemSchema);
