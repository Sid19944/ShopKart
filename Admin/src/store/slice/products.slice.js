import { createSlice } from "@reduxjs/toolkit";
import { adminUrl } from "../../Api";

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
    callingDB(state, action) {
      state.loading = true;
    },

    // Get All Products
    getProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    getProductsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Approve The Product
    approveProductSuccess(state,action){
        state.loading = false;
        state.message = action.payload
    },
    approveProductFailed(state,action){
        state.loading = false;
        state.error = action.payload;
    },

    // Block The Product
    blockProductSuccess(state,action){
        state.loading = false;
        state.message = action.payload
    },
    blockProductFailed(state,action){
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

export const getAllProducts = ()=>async(dispatch)=>{
    dispatch(productsSlice.actions.callingDB())
    try {
        const {data} = await adminUrl.get("/product/get-all")
        dispatch(productsSlice.actions.getProductsSuccess(data.products))
        dispatch(productsSlice.actions.clearError())
    } catch (error) {
        dispatch(productsSlice.actions.getProductsFailed(error.response.data.message || error.message))
        dispatch(productsSlice.actions.clearMessage())
    }
}

export const approveProduct = ()=>async(dispatch)=>{
    dispatch(productsSlice.actions.callingDB())
    try {
        const {data} = await adminUrl.get("/product/get-all")
        dispatch(productsSlice.actions.approveProductSuccess(data.message))
        dispatch(productsSlice.actions.clearError())
    } catch (error) {
        dispatch(productsSlice.actions.approveProductFailed(error.response.data.message || error.message))
        dispatch(productsSlice.actions.clearMessage())
    }
}

export const blockProduct = ()=>async(dispatch)=>{
    dispatch(productsSlice.actions.callingDB())
    try {
        const {data} = await adminUrl.get("/product/get-all")
        dispatch(productsSlice.actions.blockProductSuccess(data.message))
        dispatch(productsSlice.actions.clearError())
    } catch (error) {
        dispatch(productsSlice.actions.blockProductFailed(error.response.data.message || error.message))
        dispatch(productsSlice.actions.clearMessage())
    }
}

export default productsSlice.reducer;
