import { configureStore } from "@reduxjs/toolkit";
import userReduct from "./slice/user.slice";

const store = configureStore({
  reducer: {
    user: userReduct,
  },
});

export default store;
