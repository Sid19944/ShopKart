import jwt from "jsonwebtoken";
import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { User } from "../models/user.schema.js";
import { genAccAndRefToken } from "./genAccAndRefToken.js";

export const verifyJwt = AsyncHandler(async (req, res, next) => {
  try {
    const cookie =
      req?.cookies || req.header("Authorization")?.replace("Bearer", "");

    if (!cookie || (!cookie.accessToken && !cookie.refreshToken)) {
      return next(new ErrorHandler("Unauthorize Access Access TOKEN", 400));
    }

    const decodedToken = await jwt.verify(
      cookie.accessToken || cookie.refreshToken,
      cookie.accessToken
        ? process.env.ACCESS_TOKEN_SERCET
        : process.env.REFRESH_TOKEN_SERCET,
    );

    if (!decodedToken) {
      return next(new ErrorHandler("Invalid token ID", 400));
    }

    const user = await User.findById(decodedToken._id);
    if (!user) {
      return next(new ErrorHandler("Invalid decoded ID", 400));
    }

    const { accessToken, refreshToken } = await genAccAndRefToken(user);
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

    req.user = user;
    next()
  } catch (error) {
    return next(
      new ErrorHandler("Something went wrong while verify token", error),
    );
  }
});
