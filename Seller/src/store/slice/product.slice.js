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

    // add new product
    addProductSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addProductFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // update product
    updateProductSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updateProductFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // delete Image
    deleteProductImageSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProductImageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // add more image
    addMoreProductImageSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addMoreProductImageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // set SingleProduct
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

export const addNewProduct = (formData) => async (dispatch) => {
  dispatch(productSlice.actions.dbCalling());
  try {
    const { data } = await sellerUrl.post(`/add-product`, formData, {
      headers: {
        "Content-Type": "multipary/form-data",
      },
    });
    dispatch(productSlice.actions.addProductSuccess(data.message));
    dispatch(productSlice.actions.clearError());
  } catch (error) {
    dispatch(
      productSlice.actions.addProductFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(productSlice.actions.clearMessage());
  }
};

export const updateProduct = (prod_id, newData) => async (dispatch) => {
  dispatch(productSlice.actions.dbCalling());
  try {
    const { data } = await sellerUrl.put(`/update-product/${prod_id}`, newData);
    dispatch(productSlice.actions.updateProductSuccess(data.message));
    dispatch(productSlice.actions.clearError());
  } catch (error) {
    dispatch(
      productSlice.actions.updateProductFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(productSlice.actions.clearMessage());
  }
};

export const deleteProductImage = (prod_id, img_id) => async (dispatch) => {
  dispatch(productSlice.actions.dbCalling());
  try {
    const { data } = await sellerUrl.delete(`/${prod_id}/delete/${img_id}`);
    dispatch(productSlice.actions.deleteProductImageSuccess(data.message));
    dispatch(productSlice.actions.clearError());
  } catch (error) {
    dispatch(
      productSlice.actions.deleteProductImageFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(productSlice.actions.clearMessage());
  }
};

export const addMoreProductImage = (prod_id, img) => async (dispatch) => {
  dispatch(productSlice.actions.dbCalling());
  try {
    const { data } = await sellerUrl.put(`/add/product-image/${prod_id}`, img, {
      headers: {
        "Content-Type": "multipary/form-data",
      },
    });
    dispatch(productSlice.actions.addMoreProductImageSuccess(data.message));
    dispatch(productSlice.actions.clearError());
  } catch (error) {
    dispatch(
      productSlice.actions.addMoreProductImageFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(productSlice.actions.clearMessage());
  }
};
export default productSlice.reducer;
