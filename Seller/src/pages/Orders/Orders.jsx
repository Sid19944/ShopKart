import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderById,
  getOrders,
  setSingleOrder,
  updateOrderStatus,
} from "../../store/slice/orders.slice";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

import { motion } from "motion/react";
import toast from "react-hot-toast";
import ViewOrder from "./subComponent/ViewOrder";

function Orders() {
  const dispatch = useDispatch();
  const constraintsRef = useRef(null);
  const { mode } = useSelector((state) => state.user);
  const { loading, orders, totalOrder, error, message } = useSelector(
    (state) => state.orders,
  );
  const [showOrder, setShowOrder] = useState(false);
  const [page, setPage] = useState(1);

  const tPage = Math.ceil(totalOrder / 10);

  const handleViewOrder = (order_id) => {
    setShowOrder(!showOrder);
    const order = orders.filter((order) => order._id == order_id);
    dispatch(setSingleOrder(order[0]));
  };

  const handleUpdateStatus = (order_id, newOrderStatus) => {
    dispatch(updateOrderStatus(order_id, newOrderStatus));
  };

  const [searchId, setSearchId] = useState("");
  const handleSearchId = () => {
    dispatch(getOrderById(searchId));
  };

  const handlePage = (selectedPage) => {
    selectedPage >= 1 && selectedPage <= tPage && setPage(selectedPage);
  };

  // first call
  useEffect(() => {
    error && toast.error(error);
    message && toast.success(message);
    searchId.trim() == "" && dispatch(getOrders(page));
  }, [page, searchId, error, message]);
  return (
    <div
      className={`border-amber-300 flex flex-col h-full overflow-auto relative`}
      ref={constraintsRef}
    >
      <div
        id="info"
        className={`flex h-fit px-1 gap-1 pb-1 border-b border-b-gray-400 justify-between  items-center ${mode ? "bg-white text-black" : "bg-black text-white"}`}
      >
        <div className="flex flex-col">
          <span className="text-2xl font-semibold tracking-[1px]">
            Orders Management
          </span>
          <span className="text-[9px] sm:text-xs text-gray-400">
            Moniter and Manage your Orders acroos the ShopCart
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col sm:overflow-y-auto">
        <div className="sticky top-0">
          <div
            id="search"
            className={`flex gap-2 w-full h-fit p-2 ${mode ? "bg-white text-black" : "bg-black text-white"}`}
          >
            <div className="w-full relative">
              <input
                type="text"
                className={`border ${mode ? "bg-gray-400" : "bg-gray-500"} w-full px-1 `}
                placeholder="Search order By ID, Enter 24 digit ID"
                value={searchId || ""}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <span
                className="absolute right-0 bg-gray-400"
                onClick={() => setSearchId("")}
              >
                <CloseIcon />
              </span>
            </div>
            <button
              disabled={searchId.length != 24}
              className="border px-2 bg-blue-500 font-semibold rounded-lg active:bg-blue-700 cursor-pointer
              disabled:cursor-not-allowed disabled:bg-gray-400"
              onClick={handleSearchId}
            >
              Search
            </button>
          </div>
          <div
            className={`hidden sm:flex gap-1 font-semibold tracking-[1px] w-full h-fit justify-between p-2 border-b border-b-gray-500 text-center ${mode ? "bg-white text-black" : "bg-black text-white"}`}
          >
            <span className="w-[30%]">order</span>
            <span className="w-[15%]">CATEGORY</span>
            <span className="w-[10%]">PRICE</span>
            <span className="w-[5%]">QTY</span>
            <span className="w-[10%]">STATUS</span>
            <span className="w-[30%]">ACTION</span>
          </div>
        </div>

        <div id="list" className="flex flex-col gap-1">
          {orders?.map((order, idx) => (
            <motion.li
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              key={order._id}
              className={`${showOrder && "blur-[2px]"} h-50 sm:h-16 flex flex-col sm:flex-row gap-1 p-1 w-full sm:justify-between border-b border-b-gray-500 sm:text-center ${mode ? "bg-white text-black" : "bg-black text-white"}`}
            >
              <div className="flex h-3/4 sm:h-full justify-center sm:justify-start sm:items-center gap-1 sm:w-[30%] w-full">
                <span className="text-gray-500 hidden sm:inline-block">
                  {idx + 1}.
                </span>
                <img
                  src={order.img.url}
                  alt="order"
                  className="h-full cursor-pointer"
                  onClick={() => handleViewOrder(order._id)}
                />
                <span className="hidden sm:inline-block">{order.name}</span>
              </div>
              <div className="sm:hidden flex gap-2 flex-col items-center h-fit font-semibold">
                <span>{order.name}</span>
              </div>

              <div className="hidden sm:flex w-[15%] items-center justify-center ">
                <span className="px-2 shadow-[0px_0px_3px_3px] shadow-blue-500 rounded-full bg-blue-400 text-sm">
                  {order.category}
                </span>
              </div>
              <div className="w-[10%] hidden sm:flex items-center justify-center font-semibold">
                <span>₹{order.itemPrice}</span>
              </div>
              <div
                className={`w-[5%] hidden sm:flex items-center justify-center flex-col text-sm ${order.stock > 0 && order.stock <= 5 ? "text-orange-500" : order.stock == 0 ? "text-red-600" : "text-green-400"}`}
              >
                <span>{order.quentity}</span>
              </div>
              <div
                className={`w-[10%] hidden sm:flex items-center justify-center text-sm gap-1 text-orange-300`}
              >
                <span>{order.order_status}</span>
              </div>
              <div className="w-[30%] hidden sm:flex items-center justify-center gap-2">
                <RemoveRedEyeIcon
                  className="rounded-lg active:bg-blue-600 cursor-pointer"
                  style={{ height: "35px", width: "45px" }}
                  onClick={() => handleViewOrder(order._id)}
                />
                <div className="flex justify-around py-2">
                  <select
                    name="order_status"
                    id="order_status"
                    className="border rounded-lg px-2 bg-gray-400 cursor-pointer"
                    defaultValue={order.order_status}
                    onChange={(e) =>
                      handleUpdateStatus(order._id, e.target.value)
                    }
                    disabled={loading}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="out for delivery">Out for delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </motion.li>
          ))}

          {showOrder && (
            <motion.div
              drag
              dragConstraints={constraintsRef}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-full sm:w-fit "
            >
              <div className="overflow-y-auto">
                <ViewOrder
                  remove={() => setShowOrder(!showOrder)}
                  updateStatus={(order_id, newOrderStatus) =>
                    handleUpdateStatus(order_id, newOrderStatus)
                  }
                />
              </div>
            </motion.div>
          )}
        </div>

        {tPage > 0 && (
          <div className="sticky bottom-0">
            <div
              className={`h-fit py-1 items-center flex justify-center ${mode ? "bg-white text-black" : "bg-black text-white"}`}
            >
              <div className="max-w-[70%] overflow-x-auto p-2 flex gap-1">
                {page != 1 && (
                  <ArrowBackIosNewIcon
                    className="cursor-pointer border rounded-lg p-1 active:bg-blue-600 bg-blue-400"
                    style={{ height: "30px", width: "40px" }}
                    onClick={() => handlePage(page - 1)}
                  />
                )}

                {[...Array(tPage)].map((_, idx) => {
                  return (
                    <span
                      key={idx}
                      className={`border px-2 cursor-pointer ${page == idx + 1 && "bg-blue-600"} flex items-center`}
                      onClick={() => handlePage(idx + 1)}
                    >
                      {idx + 1}
                    </span>
                  );
                })}
                {page != tPage && (
                  <ArrowForwardIosIcon
                    className="cursor-pointer border rounded-lg p-1 active:bg-blue-600 bg-blue-400"
                    style={{ height: "30px", width: "40px" }}
                    onClick={() => handlePage(page + 1)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
