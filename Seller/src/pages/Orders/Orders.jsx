import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function Orders() {
  const dispatch = useDispatch();
  const constraintsRef = useRef(null);
  const { mode } = useSelector((state) => state.user);
  return (
    <div
      className={`border-amber-300 flex flex-col h-full overflow-auto `}
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
    </div>
  );
}

export default Orders;
