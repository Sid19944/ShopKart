import { createSlice } from "@reduxjs/toolkit";
import { adminUrl } from "../../Api";

const sellerSlice = createSlice({
  name: "sellers",
  initialState: {
    loading: false,
    sellers: [],
    seller: {},
    sellerError: null,
    sellerMessage: null,
  },
  reducers: {
    // get sellers
    getSellersRequest(state, action) {
      state.loading = true;
      state.sellerError = null;
      state.sellerMessage = null;
    },
    getSellersSuccess(state, action) {
      state.loading = false;
      state.sellers = action.payload;
    },
    getSellerFailed(state, action) {
      state.loading = false;
      state.sellerError = action.payload;
    },

    // approve the seller
    approveSellerRequest(state, action) {
      state.loading = true;
    },
    approveSellerSuccess(state, action) {
      state.loading = false;
      state.sellerMessage = action.payload;
    },
    approveSellerFailed(state, action) {
      state.loading = false;
      state.sellerError = action.payload;
    },

    // block The Seller
    blockSellerRequest(state, action) {
      state.loading = true;
    },
    blockSellerSuccess(state, action) {
      state.loading = false;
      state.sellerMessage = action.payload;
    },
    blockSellerFailed(state, action) {
      state.loading = false;
      state.sellerError = action.payload;
    },

    // getSindleSeller
    setSindleSeller(state, action) {
      state.seller = action.payload;
    },

    clearAllError(state, action) {
      state.error = null;
    },
    clearMessage(state, action) {
      state.message = null;
    },
  },
});

export const getSellers = () => async (dispatch) => {
  dispatch(sellerSlice.actions.getSellersRequest());
  try {
    const { data } = await adminUrl("/seller/get-all");
    dispatch(sellerSlice.actions.getSellersSuccess(data.sellers));
    dispatch(sellerSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      sellerSlice.actions.getSellerFailed(
        error.response.data.message || error.message,
      ),
    );
    dispatch(sellerSlice.actions.clearMessage());
  }
};

export const approveSeller = (seller_id) => async (dispatch) => {
  dispatch(sellerSlice.actions.approveSellerRequest());
  try {
    const { data } = await adminUrl.put(`/seller/approve/${seller_id}`);

    dispatch(sellerSlice.actions.approveSellerSuccess(data.message));
    dispatch(sellerSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      sellerSlice.actions.approveSellerFailed(error.response.data.message),
    );
    dispatch(sellerSlice.actions.clearMessage());
  }
};

export const blockSeller = (seller_id) => async (dispatch) => {
  dispatch(sellerSlice.actions.blockSellerRequest());
  try {
    const { data } = await adminUrl.put(`/seller/block/${seller_id}`);
    dispatch(sellerSlice.actions.blockSellerSuccess(data.message));
    dispatch(sellerSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      sellerSlice.actions.blockSellerFailed(error.response.data.message),
    );
    dispatch(sellerSlice.actions.clearMessage());
  }
};

export const setSingleSeller = (seller) => (dispatch) => {
  dispatch(sellerSlice.actions.setSindleSeller(seller));
};

export default sellerSlice.reducer;
