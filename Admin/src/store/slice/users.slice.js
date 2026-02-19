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
      state.error = null;
      state.message = null
    },
    getUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update User Status
    updateStatusSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updateStatusFailer(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // filter single User
    setSingleUser(state,action){
        state.user = action.payload
    },

    // Clear
    clearAllError(state, action) {
      state.error = null;
    },
    clearMessag(state, action) {
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
    dispatch(usersSlice.actions.clearAllError());
  } catch (error) {
    dispatch(usersSlice.actions.clearMessag());
    dispatch(
      usersSlice.actions.getUsersFailed(
        error.response.data.message || error.message,
      ),
    );
  }
};

export const approveUser = (user_id) => async (dispatch) => {
  try {
    const { data } = await adminUrl.put(`/user/approve/${user_id}`);
    dispatch(usersSlice.actions.updateStatusSuccess(data.message));
    dispatch(usersSlice.actions.clearAllError());
  } catch (error) {
    dispatch(usersSlice.actions.clearMessag());
    dispatch(
      usersSlice.actions.updateStatusFailer(
        error.response.data.message || error.message,
      ),
    );
  }
};

export const blockUser = (user_id) => async (dispatch) => {
  try {
    const { data } = await adminUrl.put(`/user/block/${user_id}`);
    dispatch(usersSlice.actions.updateStatusSuccess(data.message));
    dispatch(usersSlice.actions.clearAllError());
  } catch (error) {
    dispatch(usersSlice.actions.clearMessag());
    dispatch(
      usersSlice.actions.updateStatusFailer(
        error.response.data.message || error.message,
      ),
    );
  }
};

export const setSingleUser = (user)=>(dispatch)=>{
    dispatch(usersSlice.actions.setSingleUser(user))
}

export const clearAllError = () => async (dispatch) => {
  dispatch(usersSlice.actions.clearAllError());
};
export const clearMessag = () => (dispatch) => {
  dispatch(usersSlice.actions.clearMessag());
};

export default usersSlice.reducer;
