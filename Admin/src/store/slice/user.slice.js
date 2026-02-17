import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    // Get user
    getUserRequest(state, action) {
      state.loading = true;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    getUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // logout user
    logoutRequest(state, action) {
      state.loading = true;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // clear Error And Message
    clearAll(state, action) {
      state.error = null;
      state.message = null;
    },
  },
});

export const getUser = ()=>async(dispatch)=>{

}

export default userSlice.reducer;
