import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CountUp from "react-countup";

function OrderSuccess() {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 9000);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <div className="text-green-500 text-5xl">✔</div>

      <h1 className="text-xl sm:text-3xl justify-center font-semibold flex w-full">
        Order Placed Successfully
      </h1>

      <p className="text-gray-500">Your order has been confirmed.</p>
      <p className="text-gray-500">
        redirect in : <CountUp end={0} start={10} duration={15} />s
      </p>

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
