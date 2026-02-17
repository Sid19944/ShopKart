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

const ordersSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  order_items: [
    {
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
      total_price: {
        type: Number,
        required: true,
      },
    },
  ],
  numberOfProduct: {
    type: Number,
    required: true,
    min: 1,
  },
  shippingAddress: {
    type: shippingAddressSchema,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Prepaid"],
    required: true,
  },
});

export const Orders = mongoose.model("Orders", ordersSchema);
