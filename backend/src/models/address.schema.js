import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    addressLine: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    postOffice: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Address = mongoose.model("Address", addressSchema);
