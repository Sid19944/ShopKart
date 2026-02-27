import { configureStore } from "@reduxjs/toolkit";
import userReduct from "./slice/user.slice";
import productReducer from "./slice/product.slice";
import orderReducer from "./slice/orders.slice";

const store = configureStore({
  reducer: {
    user: userReduct,
    products: productReducer,
    orders: orderReducer,
  },
});

export default store;
