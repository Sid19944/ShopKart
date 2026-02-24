import { createSlice } from "@reduxjs/toolkit";
import { sellerUrl } from "../../Api";

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    totalProduct: 0,
    product: {},
    message: null,
    error: null,
  },
  reducers: {
    // Db Calling
    dbCalling(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // get all products
    getProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.totalProduct = action.payload.totalProduct;
    },
    getProductsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // delete Product
    productDeleteSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    productDeleteFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    //
    setSingleProduct(state, action) {
      state.loading = false;
      state.product = action.payload;
    },

    // clear err and message
    clearError(state, action) {
      state.error = null;
    },
    clearMessage(state, action) {
      state.message = null;
    },
  },
});

export const wantSeller = () => async (dispatch) => {
  dispatch(productSlice.actions.dbCalling());
  try {
  } catch (error) {}
};

export const getProducts = (pgNo) => async (dispatch) => {
  dispatch(productSlice.actions.dbCalling());
  try {
    const { data } = await sellerUrl(`/get-products/${pgNo}`);
    dispatch(productSlice.actions.getProductsSuccess(data));
    dispatch(productSlice.actions.clearError());
  } catch (error) {
    dispatch(
      productSlice.actions.getProductsFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(productSlice.actions.clearMessage());
  }
};

export const getProductsByName = (name) => async (dispatch) => {
  dispatch(productSlice.actions.dbCalling());
  try {
    const { data } = await sellerUrl.get(`/get/product-by-name/${name}`);
    dispatch(productSlice.actions.getProductsSuccess(data));
    dispatch(productSlice.actions.clearError());
  } catch (error) {
    dispatch(
      productSlice.actions.getProductsFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(productSlice.actions.clearMessage());
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  dispatch(productSlice.actions.dbCalling());
  try {
    const { data } = await sellerUrl.get(`/get/product-by-id/${id}`);
    dispatch(productSlice.actions.getProductsSuccess(data));
    dispatch(productSlice.actions.clearError());
  } catch (error) {
    dispatch(
      productSlice.actions.getProductsFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(productSlice.actions.clearMessage());
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(productSlice.actions.dbCalling());
  try {
    const { data } = await sellerUrl.delete(`/delete/${id}`);
    console.log(data)
    dispatch(productSlice.actions.productDeleteSuccess(data.message));
    dispatch(productSlice.actions.clearError());
  } catch (error) {
    dispatch(
      productSlice.actions.productDeleteFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(productSlice.actions.clearMessage());
  }
};

export const setSingleProduct = (product) => (dispatch) => {
  dispatch(productSlice.actions.setSingleProduct(product));
};
export default productSlice.reducer;
