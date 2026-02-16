import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    auth_id: {
      type: String,
      unique: true,
      required: true,
    },
    name: String,
    firstName: String,
    lastName: String,
    email: String,
    avatar: String,
    provider: String,
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
    isApproved : {
      type : Boolean,
      default : true
    },
    refreshToken: String,
    resetToken: String,
  },
  { timestamps: true },
);

// generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SERCET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    },
  );
};

// generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.REFRESH_TOKEN_SERCET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    },
  );
};

// generate reset token
userSchema.methods.generateResetToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.RESET_TOKEN_SERCET,
    {
      expiresIn: process.env.RESET_TOKEN_EXPIRES,
    },
  );
};

export const User = mongoose.model("User", userSchema);
