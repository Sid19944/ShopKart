import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import fileUpload from "express-fileupload";

const app = express();
config({ path: "./.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
     "*"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(
  fileUpload({
    tempFileDir: "/temp/",
    useTempFiles: true,
  }),
);

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/github/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);
app.use(passport.initialize());

import authRouter from "./src/routes/auth.route.js";
app.use("/auth", authRouter);

import adminRouter from "./src/routes/admin.route.js";
app.use("/admin", adminRouter);

import sellerRouter from "./src/routes/seller.route.js";
app.use("/seller", sellerRouter);

import productRouter from "./src/routes/product.route.js";
app.use("/products", productRouter);

import cartRouter from "./src/routes/cart.route.js";
app.use("/cart", cartRouter);

import addressRouter from "./src/routes/address.route.js";
app.use("/address", addressRouter);

import orderItemRouter from "./src/routes/order_item.route.js";
app.use("/order-item", orderItemRouter);

import ordersRouter from "./src/routes/orders.route.js";
app.use("/orders", ordersRouter);

import reviewRouter from "./src/routes/review.route.js";
app.use("/review", reviewRouter);

// middleware for error
import { errorMiddleware } from "./src/utils/Error.Handler.js";
app.use(errorMiddleware);
export default app;
