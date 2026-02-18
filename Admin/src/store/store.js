import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice.js";
import usersReducer from "./slice/users.slice.js";
import sellerReducer from "./slice/seller.sclic.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    sellers: sellerReducer,
  },
});

export default store;
