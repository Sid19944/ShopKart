import { createSlice } from "@reduxjs/toolkit";
import { adminUrl } from "../../Api";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    // Get all users
    getUsersRequest(state, action) {
      state.loading = true;
    },
    getUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearAll(state, action) {
      state.error = null;
      state.message = null;
    },
  },
});

// dispatch(usersSlice.actions);
export const getAllUser = () => async (dispatch) => {
  dispatch(usersSlice.actions.getUsersRequest());
  try {
    const { data } = await adminUrl("/user/get-all");
    dispatch(usersSlice.actions.getUsersSuccess(data.users));
    dispatch(usersSlice.actions.clearAll());
  } catch (error) {
    dispatch(usersSlice.actions.getUsersFailed(error.response.data.message || error.message));
  }
};

export default usersSlice.reducer;
