import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import toast from "react-hot-toast";

import GroupIcon from "@mui/icons-material/Group";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderItems,
  setOrderItem,
} from "../../store/slice/ordersItems.slice";
import { motion } from "motion/react";
import ViewOrder from "./subComponect/ViewOrder";

function Order() {
  const dispatch = useDispatch();
  const { order_items, error, message, loading } = useSelector(
    (state) => state.orderItems,
  );
  let showOrderItems = order_items;

  const [status, setStatus] = useState("allOrder");
  const [searchByName, setSearchByName] = useState("");
  const [searchByID, setSearchByID] = useState("");

  const [showOrderItem, setShowOrderItem] = useState(false);

  const handleShowOrderItem = (orderItemId) => {
    setShowOrderItem(!showOrderItem);
    const orderItem = order_items.filter(
      (orderItem) => orderItem._id == orderItemId,
    );
    dispatch(setOrderItem(orderItem[0]));
  };

  // filter by category
  if (status != "allOrder") {
    showOrderItems = showOrderItems.filter(
      (orderItem) => orderItem.category == "status",
    );
  }

  // filter by search
  if (searchByName.trim()) {
    showOrderItems = showOrderItems.filter((orderItem) =>
      orderItem.name
        .trim()
        .toLowerCase()
        .includes(searchByName.trim().toLowerCase()),
    );
  }
  if (searchByID.trim()) {
    showOrderItems = showOrderItems.filter(
      (orderItem) => orderItem._id == searchByID,
    );
  }

  const sevenDayBefore =
    new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000;
  const thirtyDayBefore =
    new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000;

  const allDates = [];
  order_items.map((order_item) => {
    allDates.push(new Date(order_item.createdAt).setHours(0, 0, 0, 0));
  });

  let lastSevenDaysRegisters = allDates.filter(
    (date) => date >= sevenDayBefore,
  );
  let lastThirtyDaysRegisters = allDates.filter(
    (date) => date >= thirtyDayBefore,
  );

  useEffect(() => {
    dispatch(getAllOrderItems());
  }, [error, message]);

  return (
    <div className="p-1 font-mono h-full flex flex-col">
      <div id="page info">
        <h1 className="text-3xl tracking-[2px]">ORDER'S MANAGEMENT</h1>
        <p className="text-xs text-gray-400">
          Oversee orders across the ShopCart
        </p>
      </div>
      <div id="top" className="grid grid-cols-3 gap-4 my-3">
        <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
          <label
            htmlFor=""
            className="flex gap-5 text-gray-400 items-center tracking-[1px]"
          >
            TOTAL ORDERS
            <span className="text-blue-600">
              <GroupIcon />
            </span>
          </label>
          <h1 className="text-3xl flex gap-3">
            <CountUp end={order_items.length} duration={2} />
            <span className="text-green-500 text-sm flex flex-wrap items-baseline gap-2">
              <QueryStatsIcon />
            </span>
          </h1>
        </div>
        <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
          <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
            LAST 7 DAYS{" "}
            <span className="text-blue-600">
              <GroupIcon />
            </span>
          </label>
          <h1 className="text-3xl flex gap-3">
            <CountUp end={lastSevenDaysRegisters.length} duration={2} />
            <span className="text-green-500 text-sm flex flex-wrap items-baseline gap-2">
              <QueryStatsIcon /> +
              {(lastSevenDaysRegisters.length * 100) / allDates.length}%
            </span>
          </h1>
        </div>

        <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
          <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
            LAST 30 DAYS{" "}
            <span className="text-blue-600">
              <GroupIcon />
            </span>
          </label>
          <h1 className="text-3xl flex gap-3">
            <CountUp end={lastThirtyDaysRegisters.length} duration={2} />
            <span className="text-green-500 text-sm flex flex-wrap items-baseline gap-2">
              <QueryStatsIcon /> +
              {(lastThirtyDaysRegisters.length * 100) / allDates.length}%
            </span>
          </h1>
        </div>
      </div>

      <div
        id="order_items"
        className="border p-1 rounded-lg flex flex-col overflow-y-auto"
      >
        <div id="search tabs" className="flex">
          <div
            id="searchByName"
            className="w-full rounded-lg p-2 my-1 flex gap-2"
          >
            <input
              type="text"
              className="p-1 border w-full rounded-lg bg-gray-500"
              placeholder="Search Order by Product Name"
              defaultValue={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </div>
          <div
            id="searchByID"
            className="w-full rounded-lg p-2 my-1 flex gap-2"
          >
            <input
              type="text"
              className="p-1 border w-full rounded-lg bg-gray-500"
              placeholder="Search Order By ID"
              defaultValue={searchByID}
              onChange={(e) => setSearchByID(e.target.value)}
            />
          </div>
        </div>

        <nav className="flex gap-3 p-2 justify-between bg-gray-900 rounded-t-lg">
          <span
            className={`p-2 px-4 rounded-lg font-semibold text-yellow-500 outline cursor-pointer`}
          >
            <CountUp end={showOrderItems.length} duration={2} />
          </span>
          <div className="bg-gray-500 px-3 p-1 rounded-lg outline">
            <label htmlFor="status">STATUS :</label>
            <select
              name="status"
              id="status"
              className="bg-gray-500 px-3 p-1 rounded-lg outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="allOrder">All Order</option>
              <option value="pending">Pending Order</option>
              <option value="processing">Processing Order</option>
              <option value="shipped">Shipped Order</option>
              <option value="outForDelivery">Out for delivery Order</option>
              <option value="delivered">Delivered Order</option>
              <option value="cancelled">Cancelled Order</option>
            </select>
          </div>
        </nav>
        <div className="flex justify-around py-2 px-2 border-b border-gray-400 ">
          <span className="w-[25%] font-semibold text-xl tracking-[2px]">
            orderItem
          </span>
          <span className="w-[20%] font-semibold text-xl tracking-[2px]">
            CATEGORY
          </span>
          <span className="w-[10%] font-semibold text-xl tracking-[2px]">
            PRICE
          </span>
          <span className="w-[10%] font-semibold text-xl tracking-[2px]">
            QTY
          </span>
          <span className="w-[15%] font-semibold text-xl tracking-[2px]">
            STATUS
          </span>
          <span className="w-[20%] text-center text-xl tracking-[2px]">
            BUYER
          </span>
        </div>

        <div className="my-2 flex flex-col overflow-auto">
          {showOrderItems.map((orderItem, idx) => (
            <motion.li
              initial={{ x: -400, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: false }}
              key={idx}
              className={`flex justify-around border-gray-700 border-b p-1 gap-3 text-md items-center `}
            >
              <div className="w-[25%] flex gap-2 items-center ">
                <img src={orderItem.img.url} className="h-13" />
                {orderItem.name}
              </div>
              <span className={`w-[20%]`}>
                <span
                  className={`w-fit px-3 p-1 rounded-full text-center bg-blue-500 ${orderItem.category == "fashon" && "bg-green-600"}  ${orderItem.category == "electronics" && "bg-yellow-700"}`}
                >
                  {orderItem.category}
                </span>
              </span>
              <span className="w-[10%] font-semibold text-lg">
                ₹{orderItem.price}
              </span>
              <div className={`w-[10%] font-semibold text-xl`}>
                {orderItem.quentity}
              </div>
              <span
                className={`w-[15%]  text-blue-500 ${orderItem.order_status == "pending" && "text-orange-500"} ${orderItem.order_status == "delivered" && "text-green-600"} ${orderItem.order_status == "cancelled" && "text-red-600"} font-semibold`}
              >
                {orderItem.order_status}
              </span>

              <span className="w-[20%] flex justify-center gap-3">
                {orderItem.buyer.name.split(" ")[0]}
                <button
                  className="text-green-500 cursor-pointer border px-2 rounded-lg flex items-center"
                  onClick={() => handleShowOrderItem(orderItem._id)}
                >
                  <RemoveRedEyeIcon />
                </button>
              </span>
            </motion.li>
          ))}

          {showOrderItem && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <ViewOrder remove={() => setShowOrderItem(!showOrderItem)} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
