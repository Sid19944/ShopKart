import { createSlice } from "@reduxjs/toolkit";
import { cartUrl } from "../../Api";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cart: {},
    cartErr: null,
    cartMsg: null,
  },

  reducers: {
    // dbCalling
    dbCalling(state, action) {
      state.loading = true;
      state.cartErr = null;
      state.cartMsg = null;
    },

    // get cart
    getCartSuccess(state, action) {
      state.loading = false;
      state.cart = action.payload;
    },
    getCartFailed(state, action) {
      state.loading = false;
      state.cartErr = action.payload;
    },

    // add to cart
    addToCartSuccess(state, action) {
      state.loading = false;
      state.cartMsg = action.payload;
    },
    addToCartFailed(state, action) {
      state.loading = false;
      state.cartErr = action.payload;
    },

    // update quentiy
    updateQuentitySuccess(state, action) {
      state.loading = false;
      state.cartMsg = action.payload;
    },
    updateQuentityFailed(state, action) {
      state.loading = false;
      state.cartErr = action.payload;
    },

    // clear cartErr
    clearErr(state, action) {
      state.cartErr = null;
    },
    clearcartMsg(state, action) {
      state.cartMsg = null;
    },
  },
});

export const getCart = () => async (dispatch) => {
  dispatch(cartSlice.actions.dbCalling());
  try {
    const { data } = await cartUrl("/single");
    dispatch(cartSlice.actions.getCartSuccess(data.cart));
    dispatch(cartSlice.actions.clearErr());
  } catch (cartErr) {
    dispatch(
      cartSlice.actions.getCartFailed(
        cartErr?.response?.data?.message || cartErr.message,
      ),
    );
    dispatch(cartSlice.actions.clearcartMsg());
  }
};

export const addToCart = (cartData) => async (dispatch) => {
  dispatch(cartSlice.actions.dbCalling());
  try {
    const { data } = await cartUrl.post(`/add-to-cart`, cartData);

    dispatch(cartSlice.actions.addToCartSuccess(data.message));
    dispatch(cartSlice.actions.clearErr());
  } catch (cartErr) {
    dispatch(
      cartSlice.actions.addToCartFailed(
        cartErr?.response?.data?.message || cartErr.message,
      ),
    );
    dispatch(cartSlice.actions.clearcartMsg());
  }
};

export const updateQuentity = (cart_id, ndata) => async (dispatch) => {
  dispatch(cartSlice.actions.dbCalling());
  try {
    const { data } = await cartUrl.put(`/update/${cart_id}`, ndata);
    dispatch(cartSlice.actions.updateQuentitySuccess(data.cartMsg));
    dispatch(cartSlice.actions.clearErr());
  } catch (cartErr) {
    dispatch(
      cartSlice.actions.updateQuentityFailed(
        cartErr?.response?.data?.message || cartErr.message,
      ),
    );
    dispatch(cartSlice.actions.clearcartMsg());
  }
};

export default cartSlice.reducer;
