import mongoose, { Schema } from "mongoose";

const sellerSchema = new Schema(
  {
    seller_id: {
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
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Seller = mongoose.model("Seller", sellerSchema);
