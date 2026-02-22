import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";

import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMonthlyReport } from "../../store/slice/monthlyReport.slice";
import LineChart from "../chart/SalesChart";
import RevenueChart from "../chart/RevenueChart";
import UserChart from "../chart/UserChart";
import ProductChart from "../chart/ProductChart";
import SellerChart from "../chart/SellerChart";

function Overview() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { sellers } = useSelector((state) => state.sellers);
  const { order_items } = useSelector((state) => state.orderItems);
  const { products } = useSelector((state) => state.products);

  const lastThirtyDay =
    new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000;

  const lastThirtyDayUser = users.filter(
    (user) => new Date(user.createdAt).setHours(0, 0, 0, 0) >= lastThirtyDay,
  ).length;

  const lastThirtyDaySellers = sellers.filter(
    (seller) =>
      new Date(seller.createdAt).setHours(0, 0, 0, 0) >= lastThirtyDay,
  ).length;

  let totalSales = 0;
  let lastThirtyDaySales = 0;
  order_items.map((item) => {
    totalSales += item.quentity;
  });
  order_items
    .filter(
      (orderItem) =>
        new Date(orderItem.createdAt).setHours(0, 0, 0, 0) >= lastThirtyDay,
    )
    .map((item) => {
      lastThirtyDaySales += item.quentity;
    });

  const lastThirtyDayProducts = products.filter(
    (product) =>
      new Date(product.createdAt).setHours(0, 0, 0, 0) >= lastThirtyDay,
  ).length;

  // calculate revenue start
  let totalRevenue = 0;
  let lastThirtyDayRevenue = 0;
  order_items.map((item) => (totalRevenue += item.itemPrice * item.quentity));
  order_items
    .filter(
      (item) => new Date(item.createdAt).setHours(0, 0, 0, 0) >= lastThirtyDay,
    )
    .map((item) => (lastThirtyDayRevenue += item.itemPrice * item.quentity));
  // calculation revenue end

  useEffect(() => {
    dispatch(getMonthlyReport());
  }, []);

  return (
    <div className="p-1 font-mono h-full flex flex-col overflow-auto">
      <div className=" bg-black">
        <div id="top" className="grid grid-cols-5 gap-4 my-3">
          <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
            <div className="flex justify-between">
              <span className="text-blue-600 bg-blue-300 border px-2 rounded-lg">
                <AccountBalanceWalletIcon />
              </span>
              <span className="text-green-900 text-xs bg-green-300 h-fit rounded-lg px-1">
                +
                <CountUp
                  end={(lastThirtyDayRevenue * 100) / totalRevenue}
                  duration={2}
                />
                %
              </span>
            </div>
            <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
              TOTAL REVENUE
            </label>
            <h1 className="text-3xl flex gap-1 items-baseline">
              ₹<CountUp end={lastThirtyDayRevenue} duration={2} />
            </h1>

            <span className="text-xs text-gray-500 flex flex-col">
              <span>vs last month,</span>
              <span className="text-gray-200">
                Total Revenue : ₹<CountUp end={totalRevenue} duration={1} />
              </span>
            </span>
          </div>
          <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
            <div className="flex justify-between">
              <span className="text-purple-600 bg-purple-300 border px-2 rounded-lg">
                <GroupIcon />
              </span>
              <span className="text-green-900 text-xs bg-green-300 h-fit rounded-lg px-1">
                +
                <CountUp
                  end={(lastThirtyDayUser * 100) / users.length}
                  duration={2}
                />
                %
              </span>
            </div>
            <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
              ACITVE USERS
            </label>
            <h1 className="text-3xl flex gap-1 items-baseline">
              <CountUp end={lastThirtyDayUser} duration={2} />
            </h1>
            <span className="text-xs text-gray-500 flex flex-col">
              <span>vs last month,</span>
              <span className="text-gray-200">
                Total User : <CountUp end={users.length} duration={1} />
              </span>
            </span>
          </div>

          <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
            <div className="flex justify-between">
              <span className="text-yellow-700 bg-yellow-200 border px-2 rounded-lg">
                <StorefrontIcon />
              </span>
              <span className="text-green-900 text-xs bg-green-300 h-fit rounded-lg px-1">
                +
                <CountUp
                  end={(lastThirtyDaySellers * 100) / sellers.length}
                  duration={2}
                />
                %
              </span>
            </div>
            <label className="flex gap-5 text-gray-400 bg0 items-center tracking-[1px]">
              ACTIVE SELLERS
            </label>
            <h1 className="text-3xl flex gap-1 items-baseline">
              <CountUp end={lastThirtyDaySellers} duration={2} />
            </h1>
            <span className="text-xs text-gray-500 flex flex-col">
              <span>vs last month,</span>
              <span className="text-gray-200">
                Total Seller : <CountUp end={sellers.length} duration={1} />
              </span>
            </span>
          </div>
          <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
            <div className="flex justify-between">
              <span className="text-green-700 bg-green-200 border px-2 rounded-lg">
                <LocalShippingIcon />
              </span>
              <span className="text-green-900 text-xs bg-green-300 h-fit rounded-lg px-1">
                +
                <CountUp
                  end={(lastThirtyDaySales * 100) / order_items.length}
                  duration={2}
                />
                %
              </span>
            </div>
            <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
              TOTAL SALES
            </label>
            <h1 className="text-3xl flex gap-1 items-baseline">
              <CountUp end={lastThirtyDaySales} duration={2} />
            </h1>
            <span className="text-xs text-gray-500 flex flex-col">
              <span>vs last month,</span>
              <span className="text-gray-200">
                Total Sale : <CountUp end={totalSales} duration={1} />
              </span>
            </span>
          </div>
          <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
            <div className="flex justify-between">
              <span className="text-indigo-700 bg-indigo-200 border px-2 rounded-lg">
                <InventoryIcon />
              </span>
              <span className="text-green-900 text-xs bg-green-300 h-fit rounded-lg px-1">
                +
                <CountUp
                  end={(lastThirtyDayProducts * 100) / products.length}
                  duration={2}
                />
                %
              </span>
            </div>
            <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
              TOTAL PRODUCTS
            </label>
            <h1 className="text-3xl flex gap-1 items-baseline">
              <CountUp end={lastThirtyDayProducts} duration={2} />
            </h1>
            <span className="text-xs text-gray-500 flex flex-col">
              <span>vs last month,</span>
              <span className="text-gray-200">
                Total Product : <CountUp end={products.length} duration={1} />
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 border p-1 rounded-lg">
        <span className=" w-full inline-block text-center sticky top-0">
          YEAR : {new Date().getFullYear()}
        </span>
        <div className="flex gap-2">
          <div className="w-200 flex flex-col justify-center border border-gray-700 p-2 rounded-lg">
            <RevenueChart />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="border border-gray-700 p-2 rounded-lg flex-1 h-fit ">
              <LineChart />
            </div>
            <div className="border border-gray-700 p-2 rounded-lg flex-1 h-fit">
              <UserChart />
            </div>
          </div>
        </div>
        <div className="flex gap-2 p-1">
          <div className="w-1/2 h-fit border border-gray-700 rounded-lg p-1">
            <ProductChart />
          </div>
          <div className="w-1/2 h-fit border border-gray-700 rounded-lg p-1">
            <SellerChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
