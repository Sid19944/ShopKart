import { configureStore } from "@reduxjs/toolkit";
import userReduct from "./slice/user.slice";
import productReducer from "./slice/product.slice";

const store = configureStore({
  reducer: {
    user: userReduct,
    products: productReducer,
  },
});

export default store;
