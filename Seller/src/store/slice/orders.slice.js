import { createSlice } from "@reduxjs/toolkit";
import { sellerUrl } from "../../Api";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    orders: [],
    order: {},
    totalOrder: 0,
    error: null,
    message: null,
  },
  reducers: {
    // db Caliing
    dbCalling(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // get all orders
    getOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload.orders;
      state.totalOrder = action.payload?.totalOrder;
    },
    getOrdersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // update order status
    updateOrderStatusSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updateOrderStatusFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // set single order
    setSingleOrder(state, action) {
      state.order = action.payload;
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

export const getOrders = (page_no) => async (dispatch) => {
  dispatch(orderSlice.actions.dbCalling());
  try {
    const { data } = await sellerUrl.get(`/get-ordered-products/${page_no}`);
    dispatch(orderSlice.actions.getOrdersSuccess(data));
    dispatch(orderSlice.actions.clearError());
  } catch (error) {
    dispatch(
      orderSlice.actions.getOrdersFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(orderSlice.actions.clearMessage());
  }
};

export const updateOrderStatus =
  (order_id, orderStatus) => async (dispatch) => {
    dispatch(orderSlice.actions.dbCalling());
    try {
      const { data } = await sellerUrl.put(`/update/order-status/${order_id}`, {
        orderStatus,
      });
      dispatch(orderSlice.actions.updateOrderStatusSuccess(data.message));
      dispatch(orderSlice.actions.clearError());
    } catch (error) {
      dispatch(
        orderSlice.actions.updateOrderStatusFailed(
          error?.response?.data?.message || error.message,
        ),
      );
      dispatch(orderSlice.actions.clearMessage());
    }
  };

export const getOrderById = (order_id) => async (dispatch) => {
  dispatch(orderSlice.actions.dbCalling());
  try {
    const { data } = await sellerUrl.get(`/get/order-by-id/${order_id}`);
    dispatch(orderSlice.actions.getOrdersSuccess(data));
    dispatch(orderSlice.actions.clearError());
  } catch (error) {
    dispatch(
      orderSlice.actions.getOrdersFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(orderSlice.actions.clearMessage());
  }
};

export const setSingleOrder = (order) => (dispatch) => {
  dispatch(orderSlice.actions.setSingleOrder(order));
};

export default orderSlice.reducer;
