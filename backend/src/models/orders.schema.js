import mongoose, { Schema } from "mongoose";

const shippingAddressSchema = new Schema(
  {
    fullName: { type: String, required: true },
    addressLine: { type: String, required: true },
    pincode: { type: Number, required: true },
    number : {type : Number, required : true, minLength : 10},
    country: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    region: { type: String, required: true },
  },
  { _id: false },
);

const ordersSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  order_items: [
    {
      order_id: {
        type: Schema.Types.ObjectId,
        ref: "Order_Item",
        required: true,
      },
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      img: {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
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
      totalPrice: { type: Number, required: true },
    },
  ],
  numberOfProduct: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: { type: Number, required: true },
  shippingAddress: {
    type: shippingAddressSchema,
    required: true,
  },
  order_status: {
    type: String,
    enum: [
      "pending",
      "processing",
      "shipped",
      "out for delivery",
      "delivered",
      "cancelled",
    ],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Prepaid"],
    required: true,
  },
});

export const Orders = mongoose.model("Orders", ordersSchema);
