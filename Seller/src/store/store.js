import { configureStore } from "@reduxjs/toolkit";
import userReduct from "./slice/user.slice";
import productReducer from "./slice/product.slice";
import orderReducer from "./slice/orders.slice";
import addressReducer from "./slice/address.slice"

const store = configureStore({
  reducer: {
    user: userReduct,
    products: productReducer,
    orders: orderReducer,
    address : addressReducer
  },
});

export default store;
