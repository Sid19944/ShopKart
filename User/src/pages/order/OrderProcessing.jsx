import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { orderItemUrl, orderUrl } from "../../Api";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";

function OrderProcessing() {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  const location = useLocation();
  const address = location.state;

  const products = [];
  cart?.items?.map((item) => {
    const obj = {
      product_id: item.product_id._id,
      quentity: item.quentity,
    };

    products.push(obj);
  });

  useEffect(() => {
    orderItemUrl
      .post("/order-place", {
        products: products,
        shippingAddress_id: address.shippingAddress_id,
      })
      .then((res) => {
        navigate("/order-success");
      })
      .catch((err) => toast.error(err?.response?.data?.message || err.message));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>

      <h1 className="text-2xl font-semibold tracking-[1px]">
        Processing your order...
      </h1>

      <p className="text-gray-500 text-center">
        Please wait while we confirm your payment and place your order.
      </p>
    </div>
  );
}

export default OrderProcessing;
