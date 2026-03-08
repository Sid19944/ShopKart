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

    // add New Address
    addNewAddressSuccess(state, action) {
      state.loading = false;
      state.addMsg = action.payload;
    },
    addNewAddressFailed(state, action) {
      state.loading = false;
      state.addErr = action.payload;
    },

    // delete address
    deleteAddressSuccess(state, action) {
      state.loading = false;
      state.addMsg = action.payload;
    },
    deleteAddressFailed(state, action) {
      state.loading = false;
      state.addErr = action.payload;
    },

    // update address
    updateAddressSuccess(state, action) {
      state.loading = false;
      state.addMsg = action.payload;
    },
    updateAddressFailed(state, action) {
      state.loading = false;
      state.addErr = action.payload;
    },

    // clear cartErr
    clearErr(state, action) {
      state.addErr = null;
    },
    cleatMsg(state, action) {
      state.addMsg = null;
    },

    // set
    setSingleAddress(state,action){
      state.addres = action.payload
    }
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
    dispatch(addressSlice.actions.cleatMsg());
  }
};

export const addNewAddress = (addData) => async (dispatch) => {
  dispatch(addressSlice.actions.dbCalling());
  try {
    const { data } = await addressUrl.post("/add", addData);
    dispatch(addressSlice.actions.addNewAddressSuccess(data.message));
    dispatch(addressSlice.actions.clearErr());
  } catch (error) {
    dispatch(
      addressSlice.actions.addNewAddressFailed(
        cartErr?.response?.data?.message || cartErr.message,
      ),
    );
    dispatch(addressSlice.actions.cleatMsg());
  }
};

export const deleteAddress = (address_id) => async (dispatch) => {
  dispatch(addressSlice.actions.dbCalling());
  try {
    const { data } = await addressUrl.delete(`/delete/${address_id}`);
    dispatch(addressSlice.actions.deleteAddressSuccess(data.message));
    dispatch(addressSlice.actions.clearErr());
  } catch (error) {
    dispatch(
      addressSlice.actions.deleteAddressFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(addressSlice.actions.cleatMsg());
  }
};

export const updateAddress = (address_id, newAddress) => async (dispatch) => {
  dispatch(addressSlice.actions.dbCalling());
  try {
    const { data } = await addressUrl.put(`/update/${address_id}`, newAddress);
    dispatch(addressSlice.actions.updateAddressSuccess(data.message));
    dispatch(addressSlice.actions.clearErr());
  } catch (error) {
    dispatch(
      addressSlice.actions.updateAddressFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(addressSlice.actions.cleatMsg());
  }
};

export const setSingleAddress = (addres) => async (dispatch) => {
  dispatch(addressSlice.actions.setSingleAddress(addres));
};

export default addressSlice.reducer;
