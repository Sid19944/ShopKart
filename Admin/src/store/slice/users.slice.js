import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
    user: {},
    error: null,
    message: null,
  },
  reducers : {

  }
});


