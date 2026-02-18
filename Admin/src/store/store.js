import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice.js";
import usersReducer from "./slice/users.slice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  },
});

export default store;
