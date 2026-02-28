import { createSlice } from "@reduxjs/toolkit";
import { authUrl, sellerUrl } from "../../Api";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    seller: {},
    address: [],
    error: null,
    message: null,
    mode: false,
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

    // get seller
    getSellerRequest(state, action) {
      state.loading = true;
    },
    getSellerSuccess(state, action) {
      state.loading = false;
      state.seller = action.payload.seller;
      state.address = action.payload.address;
    },
    getSellerFailed(state, action) {
      state.loading = false;
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
    },
    clearMessag(state, action) {
      state.message = null;
    },

    //
    setMode(state, action) {
      state.mode = action.payload;
    },
  },
});

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.getUserRequest());
  try {
    const { data } = await authUrl.get("/get-curr-user");
    dispatch(userSlice.actions.getUserSuccess(data.user));
    dispatch(userSlice.actions.clearAll());
  } catch (error) {
    dispatch(
      userSlice.actions.getUserFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(userSlice.actions.clearMessag());
  }
};

export const getSeller = () => async (dispatch) => {
  dispatch(userSlice.actions.getSellerRequest());
  try {
    const { data } = await sellerUrl.get("/get-curr-seller");
    dispatch(userSlice.actions.getSellerSuccess(data));
    dispatch(userSlice.actions.clearAll());
  } catch (error) {
    dispatch(
      userSlice.actions.getSellerFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(userSlice.actions.clearMessag());
  }
};

export const logout = () => async (dispatch) => {
  dispatch(userSlice.actions.logoutRequest());
  try {
    const { data } = await authUrl.post("/logout");
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.clearAll);
  } catch (error) {
    dispatch(
      userSlice.actions.logoutFailed(
        error?.response?.data?.message || error.message,
      ),
    );
  }
};

export const setMode = (mode) => (dispatch) => {
  dispatch(userSlice.actions.setMode(mode));
};

export default userSlice.reducer;
