import { createSlice } from "@reduxjs/toolkit";
import { addressUrl } from "../../Api";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    loading: false,
    address: [],
    addres: {},
    addErr: null,
    addMsg: null,
  },

  reducers: {
    // dbCalling
    dbCalling(state, action) {
      state.loading = true;
      state.addErr = null;
      state.addMsg = null;
    },

    // get address
    getAddressSuccess(state, action) {
      state.loading = false;
      state.address = action.payload;
    },
    getAddressFailed(state, action) {
      state.loading = false;
      state.addErr = action.payload;
    },

    // clear cartErr
    clearErr(state, action) {
      state.addErr = null;
    },
    clearcartMsg(state, action) {
      state.addMsg = null;
    },
  },
});

export const getAddress = () => async (dispatch) => {
  dispatch(addressSlice.actions.dbCalling());
  try {
    const { data } = await addressUrl.get("/addresses-for-user");
    dispatch(addressSlice.actions.getAddressSuccess(data.allAddress));
    dispatch(addressSlice.actions.clearErr());
  } catch (error) {
    dispatch(
      addressSlice.actions.getAddressFailed(
        cartErr?.response?.data?.cartMsg || cartErr.cartMsg,
      ),
    );
    dispatch(addressSlice.actions.clearcartMsg());
  }
};

export default addressSlice.reducer;
