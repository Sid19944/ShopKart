import { createSlice } from "@reduxjs/toolkit";
import { addressUrl } from "../../Api";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    loading: false,
    address: [],
    addres: {},
    message: null,
    error: null,
  },
  reducers: {
    // db calling
    dbCalling(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // get address
    getUserAddressSuccess(state, action) {
      state.loading = false;
      state.address = action.payload;
    },
    getUserAddressFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // add new address
    addNewAddressSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addNewAddressFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // update address
    updateAddressSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updateAddressFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // delete address
    deleteAddressSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteAddressFailed(state, action) {
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
  },
});

export const getAllAddress = () => async (dispatch) => {
  dispatch(addressSlice.actions.dbCalling());
  try {
    const { data } = await addressUrl.get("/addresses-for-user");
    dispatch(addressSlice.actions.getUserAddressSuccess(data.allAddress));
    dispatch(addressSlice.actions.clearAll());
  } catch (error) {
    dispatch(
      addressSlice.actions.getUserAddressFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(addressSlice.actions.clearMessag());
  }
};

export const addNewAddress = (data) => async (dispatch) => {
  dispatch(addressSlice.actions.dbCalling());
  try {
    const { data } = await addressUrl.post(`/add`, data);
    dispatch(addressSlice.actions.clearAll());
    dispatch(addressSlice.actions.addNewAddressSuccess(data.message));
  } catch (error) {
    dispatch(
      addressSlice.actions.addNewAddressFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(addressSlice.actions.clearMessag());
  }
};

export const updateAddress = (address_id, newAddress) => async (dispatch) => {
  dispatch(addressSlice.actions.dbCalling());
  try {
    const { data } = await addressUrl.put(`/update/${address_id}`, newAddress);
    dispatch(addressSlice.actions.updateAddressSuccess(data.message));
    dispatch(addressSlice.actions.clearAll());
  } catch (error) {
    dispatch(
      addressSlice.actions.updateAddressFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(addressSlice.actions.clearMessag());
  }
};

export const deleteAddress = (address_id) => async (dispatch) => {
  dispatch(addressSlice.actions.dbCalling());
  try {
    const { data } = await addressUrl.delete(`/delete/${address_id}`);
    dispatch(addressSlice.actions.deleteAddressSuccess(data.message));
    dispatch(addressSlice.actions.clearAll());
  } catch (error) {
    dispatch(
      addressSlice.actions.deleteAddressFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(addressSlice.actions.clearMessag());
  }
};

export default addressSlice.reducer;
