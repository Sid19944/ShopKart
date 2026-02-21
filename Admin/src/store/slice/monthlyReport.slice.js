import { createSlice } from "@reduxjs/toolkit";
import { adminUrl } from "../../Api";

const reportSlice = createSlice({
  name: "monthlyReport",
  initialState: {
    loading: false,
    revenue: [],
    users: [],
    sallers: [],
    sales: [],
    products: [],
  },
  reducers: {
    // db call
    dbCalling(state, action) {
      state.loading = true;
    },

    getReport(state, action) {
      state.loading = false;
      state.revenue = action.payload.revenueReport;
      state.users = action.payload.userReport;
      state.sallers = action.payload.sellerReport;
      state.sales = action.payload.saleReport;
      state.products = action.payload.productReport;
    },
  },
});

export const getMonthlyReport = () => async (dispatch) => {
  dispatch(reportSlice.actions.dbCalling());
  try {
    const { data } = await adminUrl.get("/monthly-report");
    dispatch(reportSlice.actions.getReport(data));
  } catch (error) {
    console.log(error);
  }
};

export default reportSlice.reducer
