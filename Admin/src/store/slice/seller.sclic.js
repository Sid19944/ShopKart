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
    }
    
    ,
    clearAllError(state, action) {
      state.error = null;
    },
    clearMessage(state, action) {
      state.message = null;
    },
  },
});

export const getSellers = ()=>async(dispatch)=>{
    dispatch(sellerSlice.actions.getSellersRequest())
    try {
        const {data} = await adminUrl("/seller/get-all");
        dispatch(sellerSlice.actions.getSellersSuccess(data.sellers))
        dispatch(sellerSlice.actions.clearAllError())
    } catch (error) {
        dispatch(sellerSlice.actions.getSellerFailed(error.response.data.message || error.message))
        dispatch(sellerSlice.actions.clearMessage())
    }
}

export default sellerSlice.reducer;
