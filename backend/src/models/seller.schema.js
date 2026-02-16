import mongoose, { Schema } from "mongoose";

const sellerSchema = new Schema(
  {
    seller_Id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    storeAddress: {
      type: Schema.Types.ObjectId,
      ref: "Adddress",
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Seller = mongoose.model("Seller", sellerSchema);
