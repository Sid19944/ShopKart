import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <div className="text-green-500 text-5xl">✔</div>

      <h1 className="text-3xl font-semibold">Order Placed Successfully</h1>

      <p className="text-gray-500">Your order has been confirmed.</p>

      <button
        onClick={() => navigate("/")}
        className="bg-orange-400 px-6 py-2 text-white rounded-lg font-semibold"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;
