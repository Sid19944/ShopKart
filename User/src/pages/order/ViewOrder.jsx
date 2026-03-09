import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderItemUrl } from "../../Api";

import toast from "react-hot-toast";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";

function ViewOrder() {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [refresh, setRefresh] = useState("");
  useEffect(() => {
    orderItemUrl
      .get(`/get-order-by-id/${order_id}`)
      .then((res) => setOrder(res.data.order))
      .catch((err) => toast.error(err?.response?.data?.message || err.message));
  }, [refresh]);

  const handleCancelOrder = (order_id) => {
    orderItemUrl
      .put(`/cancel-order/${order_id}`)
      .then((res) => {
        toast.success(res.data.message);
        setRefresh("ref");
      })
      .catch((err) => toast.error(err?.response?.data?.message || err.message));
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex text-white w-full justify-between items-center px-2 py-2 bg-blue-600 ">
        <span
          className="font-semibold tracking-[1px] px-2 text-2xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          ShopKart
        </span>
      </div>

      <div className="w-full sm:w-[70%] p-2 gap-2 flex flex-col">
        <div id="product" className="rounded-lg flex gap-2 p-2">
          <img src={order?.img?.url} alt="Product" className="h-17" />
          <div className="flex flex-col">
            <span>{order?.name}</span>
            <span className="text-sm text-gray-400">{order?.category}</span>
            <span className="text-gray-400" style={{fontSize : "12px"}}>
              Order ID : {order._id}
            </span>
          </div>
        </div>

        <div
          id="status"
          className="flex gap-2 font-semibold border border-gray-400 p-2 rounded-lg"
        >
          <span>Order Status </span>
          <span className="border w-fit px-3 rounded-lg ">
            {order?.order_status?.toUpperCase()}
          </span>
        </div>

        {order?.order_status != "cancelled" && (
          <div className="flex font-semibold flex-wrap justify-between p-2 border border-gray-400 rounded-lg gap-2">
            <h1>Would you like to cancel order</h1>
            <button
              className="border w-50 rounded-lg active:bg-orange-400"
              onClick={() => handleCancelOrder(order._id)}
            >
              Cancel
            </button>
          </div>
        )}

        <div
          id="delivery"
          className="flex border border-gray-400 flex-col text-sm p-2 rounded-lg gap-2"
        >
          <span className="text-xl font-semibold">Delivery details</span>
          <div>
            <h1 className="font-semibold flex items-center gap-1">
              <PersonIcon />
              {order?.shippingAddress?.fullName}{" "}
              {order?.shippingAddress?.number}
            </h1>

            <h1 className="flex items-center gap-1">
              <HomeIcon />
              {order?.shippingAddress?.addressLine},
              {order?.shippingAddress?.region},
              {order?.shippingAddress?.district},
              {order?.shippingAddress?.country},
              {order?.shippingAddress?.pincode}
            </h1>
          </div>
        </div>

        <div
          id="price"
          className="flex border border-gray-400 flex-col p-2 rounded-lg gap-2"
        >
          <span className="text-xl font-semibold">Price details</span>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span>Price Per Peice</span>
              <span>₹{order.itemPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Product Quentity</span>
              <span>{order.quentity}</span>
            </div>
            <div className="flex justify-between ">
              <span>Payment Method</span>
              <span>Cash on delivery</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Price</span>
              <span>₹{order.itemPrice * order.quentity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
