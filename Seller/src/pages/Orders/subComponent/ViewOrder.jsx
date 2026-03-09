import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

import Rating from "@mui/material/Rating";
import { motion } from "motion/react";

// { remove, editProd, deleteProd }
function ViewOrder({ remove ,updateStatus }) {
  const { order } = useSelector((state) => state.orders);
  const { mode } = useSelector((state) => state.user);


  return (
    <motion.div
      className={`border p-2 rounded-lg max-h-[90vh] overflow-y-auto flex flex-col gap-2 ${mode ? "bg-mist-300 text-black" : "bg-gray-900"} `}
    >
      <div className="flex flex-col text-lg tracking-[2px]">
        <div className="flex justify-between ">
          <span className="tracking-[2px] text-blue-700 font-semibold">
            ORDER DETAILS
          </span>
          <CloseIcon
            onClick={() => remove()}
            className="cursor-pointer active:text-blue-600"
          />
        </div>

        <span className="text-xs text-gray-500 min-w-65">
          ID :{" "}
          <input
            type="text"
            className="w-60"
            defaultValue={order._id}
            disabled
          />
        </span>
      </div>

      <div id="product" className="border rounded-lg flex">
        <div className="flex flex-wrap flex-col p-1 gap-2 w-full">
          <div className="w-full justify-center flex border-b border-gray-500">
            <img
              src={order.img.url}
              alt="avatar"
              className="h-25 rounded-lg "
            />
          </div>
          <div className="flex flex-wrap flex-col p-1 gap-2 w-full">
            <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
              <label>NAME :</label>
              <h1>{order.name}</h1>
            </div>
            <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
              <label>PRICE :</label>
              <h1>₹{order.itemPrice}</h1>
            </div>
            <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
              <label>ORDER QTY :</label>
              <h1 className="font-semibold">{order.quentity}</h1>
            </div>
            <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
              <label>BUYER :</label>
              <h1 className="font-semibold">{order.buyer.name}</h1>
            </div>
          </div>
        </div>
      </div>

      <div id="store" className="border rounded-lg flex p-1 flex-col">
        <span className="border-b text-blue-600">Shipping Address :</span>
        <span className="">{order.shippingAddress.country + ","}</span>
        <span defaultValue={order.shippingAddress.fullName + ","}></span>
        <span defaultValue={order.shippingAddress.addressLine + ","}></span>
        <span className="">{order.shippingAddress.pincode + ","}</span>
        <span className="">{order.shippingAddress.region + ","}</span>
        <span className="">{order.shippingAddress.state + ","}</span>

        <span>{order.shippingAddress.district}</span>
      </div>
      <div className="flex sm:hidden justify-around py-2">
        <label htmlFor="order_status" className="text-sm">
          Update Status :
        </label>
        <select
          name="order_status"
          id="order_status"
          className="border rounded-lg px-2 bg-gray-400 cursor-pointer"
          defaultValue={"pending"}
          onChange={(e) => updateStatus(order._id,e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="out for delivery">Out for delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </motion.div>
  );
}

export default ViewOrder;
