import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice.js";
import usersReducer from "./slice/users.slice.js";
import sellerReducer from "./slice/seller.sclic.js";
import productReducer from "./slice/products.slice.js";
import orderItemReducer from "./slice/ordersItems.slice.js";
import reportReducer from "./slice/monthlyReport.slice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    sellers: sellerReducer,
    products: productReducer,
    orderItems: orderItemReducer,
    monthlyReport: reportReducer,
  },
});

export default store;
