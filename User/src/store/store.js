import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice";
import productReducer from "./slice/product.slice"

const store = configureStore({
  reducer: {
    user: userReducer,
    products : productReducer
  },
});

export default store;
