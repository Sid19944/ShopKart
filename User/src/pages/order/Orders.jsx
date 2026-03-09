import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import FilterListAltIcon from "@mui/icons-material/FilterListAlt";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate, Link } from "react-router-dom";
import { orderItemUrl } from "../../Api";

import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

function Orders() {
  const navigate = useNavigate();
  let [orders, setOrders] = useState();
  const [showFilterTab, setShowFilterTab] = useState(false);
  const [filter, setFilter] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [search, setSearch] = useState("");
  const currDate = new Date().setHours(0, 0, 0, 0);

  useEffect(() => {
    orderItemUrl
      .get("/get-order-curr-user")
      .then((res) => setOrders(res.data.orders))
      .catch((err) => {
        toast.error(err?.response?.data?.message || err.message);
      });
  }, []);

  const [debounce, setDebounce] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  if (debounce != "") {
    orders = orders.filter((order) =>
      order.name
        .toLowerCase()
        .trim()
        .includes(debounce.toLocaleLowerCase().trim()),
    );
  }

  if (filter) {
    if (orderStatus != "") {
      orders = orders?.filter((order) => order.order_status == orderStatus);
    }
    if (orderDate != "") {
      orders = orders?.filter(
        (order) => new Date(order.createdAt).setHours(0, 0, 0, 0) > orderDate,
      );
    }
  }

  return (
    <div
      className={`flex flex-col h-screen ${showFilterTab && "bg-gray-300"} `}
    >
      <div className="flex flex-col items-center justify-between w-full sticky top-0 ">
        <div className="flex text-white w-full justify-between items-center px-2 py-3 bg-blue-600 ">
          <span
            className="font-semibold tracking-[1px] px-2 text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            ShopKart
          </span>
        </div>

        <div className="border-b-2 w-full text-xl font-bold tracking-[1px] flex gap-3 p-2 items-center">
          <ArrowBackIcon
            onClick={() => navigate("/")}
            style={{ width: "40px" }}
            className="cursor-pointer"
          />
          <h1>My Orders</h1>
        </div>

        <div id="filters" className="border-b-2 w-full p-1 flex">
          <div
            id="search"
            className="border-2 rounded-lg items-center px-3 w-[70%] flex"
          >
            <SearchIcon />
            <input
              type="text"
              className="w-full p-2 rounded-lg border-gray-400 
          outline-none"
              placeholder="Search your order here"
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
            />
            <CloseIcon
              onClick={() => setSearch("")}
              className="cursor-pointer"
            />
          </div>
          <div
            id="filter"
            className="w-[30%] flex items-center justify-center"
            onClick={() => setShowFilterTab(true)}
          >
            <FilterListAltIcon style={{ height: "30px", width: "30px" }} />
            <label
              htmlFor="filter"
              className="text-lg font-semibold tracking-[1px] cursor-pointer"
            >
              Filters
            </label>
          </div>
        </div>
      </div>

      <div id="orders" className="flex flex-1 flex-col p-2 overflow-auto">
        {orders?.slice().reverse().map((order, idx) => (
          <div
            key={idx}
            className="border-b border-gray-400 flex p-2 gap-3 cursor-pointer"
            onClick={() => navigate(`/orders/${order._id}`)}
          >
            <img
              src={order.img.url}
              alt="product
            "
              className="h-20 w-20 sm:w-fit"
            />
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col justify-center">
                <h1 className="text-sm text-gray-400" style={{fontSize : "10px"}}>
                  Order ID : {order._id}
                </h1>
                <h1
                  className={`${order.order_status == "pending" ? "text-orange-400" : order.order_status == "delivered" ? "text-green-500" : order.order_status == "cancelled" ? "text-red-500" : "text-blue-400"}`}
                >
                  {order.order_status}
                </h1>
                <h1 className="">{order.name}</h1>
                <h1 className="text-sm text-gray-400">
                  Order Date :{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-In")}
                </h1>
              </div>
              <div>
                <ArrowForwardIcon />
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showFilterTab && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            id="filterTab"
            className="border w-full bg-white text-black flex flex-col p-5 gap-5"
          >
            <div className="flex justify-between font-semibold tracking-[1px] text-xl">
              <h1>Filters</h1>
              {(orderStatus != "" || orderDate != "") && (
                <span
                  className="text-sm text-blue-600 font-serif font-normal underline cursor-pointer"
                  onClick={() => {
                    setOrderStatus("");
                    setOrderDate("");
                    setFilter(false);
                  }}
                >
                  Clear Filter
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <span>Order Status</span>
              <div className="flex gap-4">
                <span
                  className={`cursor-pointer outline px-2 rounded-lg ${orderStatus == "delivered" && "text-blue-600 outline-2"}`}
                  onClick={() => setOrderStatus("delivered")}
                >
                  Delivered
                </span>
                <span
                  className={`cursor-pointer outline px-2 rounded-lg ${orderStatus == "cancelled" && "text-blue-600 outline-2"}`}
                  onClick={() => setOrderStatus("cancelled")}
                >
                  Cancelled
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span>Order Date</span>
              <div className="flex gap-4 flex-col sm:flex-row">
                <span
                  className={`cursor-pointer outline px-2 rounded-lg w-fit ${
                    orderDate == currDate - 30 * 24 * 60 * 60 * 1000 &&
                    "text-blue-600 outline-2"
                  }`}
                  onClick={() =>
                    setOrderDate(currDate - 30 * 24 * 60 * 60 * 1000)
                  }
                >
                  Last 30 Days
                </span>
                <span
                  className={`cursor-pointer outline px-2 rounded-lg w-fit ${orderDate == new Date(`${new Date().getFullYear() - 1}-01-01T00:00:00.000Z`).setHours(0, 0, 0, 0) && "text-blue-600 outline-2"}`}
                  onClick={() =>
                    setOrderDate(
                      new Date(
                        `${new Date().getFullYear() - 1}-01-01T00:00:00.000Z`,
                      ).setHours(0, 0, 0, 0),
                    )
                  }
                >
                  Year : {new Date().getFullYear() - 1} To Today
                </span>
              </div>
            </div>
            <div className="flex justify-between gap-2 font-semibold ">
              <button
                className="cursor-pointer border w-1/2 p-2 rounded-lg text-blue-500"
                onClick={() => {
                  setShowFilterTab(false);
                  setFilter(false);
                  setOrderStatus("");
                  setOrderDate("");
                }}
              >
                Cancel
              </button>
              <button
                className={`cursor-pointer border w-1/2 p-2 rounded-lg ${orderDate != "" || orderStatus != "" ? "bg-yellow-400" : "text-blue-600"} `}
                onClick={() => {
                  setShowFilterTab(false);
                  setFilter(true);
                }}
              >
                {filter ? "Applyed" : "Apply"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Orders;
