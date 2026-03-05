import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice";
import productReducer from "./slice/product.slice";
import cartReducer from "./slice/cart.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
