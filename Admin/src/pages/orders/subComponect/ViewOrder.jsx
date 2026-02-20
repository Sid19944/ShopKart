import React from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";

function ViewOrder({ remove }) {
  const { order_item } = useSelector((state) => state.orderItems);
  return (
    <motion.div className="border bg-gray-900 p-2 rounded-lg flex flex-col gap-2 min-w-100">
      <div className="flex flex-col text-lg tracking-[2px]">
        <div className="flex  justify-between ">
          <span className="tracking-[2px] text-blue-700">
            order_item'S DETAILS
          </span>
          <CloseIcon onClick={() => remove()} className="cursor-pointer" />
        </div>

        <span className="text-xs text-gray-500">ID : {order_item._id}</span>
      </div>

      <div id="order_item" className="border rounded-lg flex">
        <div className="flex flex-wrap flex-col p-1 gap-2 w-full">
          <div className="w-full justify-center flex border-b border-gray-500">
            <img
              src={order_item.img.url}
              alt="avatar"
              className="h-25 rounded-lg"
            />
          </div>
          <div className="flex w-full gap-2 border-b border-gray-500">
            <label>NAME :</label>
            <h1>{order_item.name}</h1>
          </div>
          <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
            <label>PRICE :</label>
            <h1>₹{order_item.price}</h1>
          </div>
          <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
            <label>QUENTITY :</label>
            <h1>{order_item.quentity}</h1>
          </div>
          <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
            <label>CATEGORY :</label>
            <h1>{order_item.category}</h1>
          </div>
          <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
            <label>STATUS :</label>
            <h1>{order_item.order_status}</h1>
          </div>
        </div>
      </div>
      <div id="shippingAddress" className="border rounded-lg flex">
        <div className="flex flex-wrap flex-col p-1 w-full">
          <span className="tracking-[2px] text-blue-700">
            SHIPPING ADDRESS :{" "}
          </span>
          <span>NAME : {order_item.shippingAddress.fullName},</span>
          <span>{order_item.shippingAddress.addressLine},</span>

          <div className="flex flex-col">
            <div className="flex gap-2">
              <span>{order_item.shippingAddress.postOffice},</span>
              <span>{order_item.shippingAddress.district},</span>
            </div>
            <div className="flex gap-2">
              <span>{order_item.shippingAddress.pincode},</span>
              <span>{order_item.shippingAddress.state},</span>
              <span>{order_item.shippingAddress.country}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ViewOrder;
