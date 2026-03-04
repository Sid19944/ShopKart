import { createSlice } from "@reduxjs/toolkit";
import { productUrl } from "../../Api";

const products = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    product: {},
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

    getProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    getProductsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // get single product by id
    getSingleProductByIdSucess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    getSingleProductByIdFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // set single product
    setSingleProduct(state, action) {
      state.product = action.payload;
    },

    // clear error
    clearErr(state, action) {
      state.error = null;
    },
    clearMessage(state, action) {
      state.message = null;
    },
  },
});

export const getProducts = (pageNo) => async (dispatch) => {
  dispatch(products.actions.dbCalling());
  try {
    const { data } = await productUrl.get(`/${pageNo}`);
    dispatch(products.actions.getProductsSuccess(data.products));
    dispatch(products.actions.clearErr());
  } catch (error) {
    dispatch(
      products.actions.getProductsFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(products.actions.clearMessage());
  }
};

export const getSingleProductById = (prod_id) => async (dispatch) => {
  dispatch(products.actions.dbCalling());
  try {
    const { data } = await productUrl.get(`/one/${prod_id}`);
    dispatch(products.actions.getSingleProductByIdSucess(data.products[0]));
    dispatch(products.actions.clearErr());
  } catch (error) {
    dispatch(
      products.actions.getSingleProductByIdFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(products.actions.clearMessage());
  }
};

export const setSingleProduct = (product) => (dispatch) => {
  dispatch(products.actions.setSingleProduct(product));
};

export default products.reducer;
