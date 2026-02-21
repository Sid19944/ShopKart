import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";

import CountUp from "react-countup";
import { useSelector } from "react-redux";

function Overview() {
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

  const lastThirtyDaySales = order_items.filter(
    (orderItem) =>
      new Date(orderItem.createdAt).setHours(0, 0, 0, 0) >= lastThirtyDay,
  ).length;

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

  return (
    <div className="p-1 font-mono h-full flex flex-col">
      <div id="page info">
        <h1 className="text-3xl tracking-[2px]">PLATEFORM OVERVIEW</h1>
        <p className="text-xs text-gray-400">
          Performance metrics for ShopCark ecosystem
        </p>
      </div>
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
              Total Revenue : ₹{totalRevenue}
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
            <span className="text-gray-200">Total User : {users.length}</span>
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
              Total Seller : {sellers.length}
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
              Total Sale : {order_items.length}
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
              Total Product : {products.length}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Overview;
