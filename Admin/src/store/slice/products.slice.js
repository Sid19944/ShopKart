import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    product: {},
    error: null,
    message: null,
  },
  reducers: {
    // Get All Products
    getProductsRequest(state, action) {
      state.loading = true;
    },
    getProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    getProductsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },



    
    // clear error and message
    clearError(state, action) {
      state.error = null;
    },
    clearMessage(state, action) {
      state.message = null;
    },
  },
});


export default productsSlice.reducer;
