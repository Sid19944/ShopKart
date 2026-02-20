import { createSlice } from "@reduxjs/toolkit";
import { adminUrl } from "../../Api";

const orderItemsSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    order_items: [],
    order_item: {},
    error: null,
    message: null,
  },
  reducers: {
    // db call
    dbCallRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // get all orders
    getAllOrderSuccess(state, action) {
      state.loading = false;
      state.order_items = action.payload;
    },
    getAllOrderFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // set Single Order_item
    setOrderItem(state, action) {
      state.order_item = action.payload;
    },

    // clear err and message
    clearAllError(state, action) {
      state.error = null;
    },
    clearMessage(state, action) {
      state.message = null;
    },
  },
});

export const getAllOrderItems = () => async (dispatch) => {
  dispatch(orderItemsSlice.actions.dbCallRequest());
  try {
    const { data } = await adminUrl.get("/order-item/get-all");
    dispatch(orderItemsSlice.actions.getAllOrderSuccess(data.order_items));
    dispatch(orderItemsSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      orderItemsSlice.actions.getAllOrderFailed(
        error?.response?.data?.message || error.message,
      ),
    );
    dispatch(orderItemsSlice.actions.clearMessage());
  }
};

export const setOrderItem = (order_item) => (dispatch) => {
  dispatch(orderItemsSlice.actions.setOrderItem(order_item));
};

export default orderItemsSlice.reducer;
