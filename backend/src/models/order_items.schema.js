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

const order_itemSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller_id: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
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
    category: {
      type: String,
      required: true,
    },
    quentity: {
      type: Number,
      min: 1,
      required: true,
    },
    itemPrice: {
      type: Number,
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
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
  },
  { timestamps: true },
);

export const Order_Item = mongoose.model("Order_Item", order_itemSchema);
