import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice.js";
import usersReducer from "./slice/users.slice.js";
import sellerReducer from "./slice/seller.sclic.js";
import productReducer from "./slice/products.slice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    sellers: sellerReducer,
    products: productReducer,
  },
});

export default store;
