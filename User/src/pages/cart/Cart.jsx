import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { Link, useNavigate } from "react-router-dom";
import { cartUrl } from "../../Api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getCart, updateQuentity } from "../../store/slice/cart.slice";

import { motion } from "motion/react";

const button = {
  padding: "10px 20px",
  fontSize: "16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: "#ff4",
  color: "#764ba2",
  fontWeight: "bold",
  border : "1px solid",

};

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, cartErr, cartMsg } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [cartErr, cartMsg]);

  const handleQuentity = async (prod_id, qty) => {
    dispatch(updateQuentity(cart._id, { product_id: prod_id, quentity: qty }));
  };

  return (
    <div className="border flex flex-col items-center gap-5 h-screen overflow-auto">
      <div className="flex border px-2 py-1 items-center bg-blue-600 justify-between w-full sticky top-0 z-20">
        <div className="flex text-white w-full justify-between items-center ">
          <span
            className="font-semibold tracking-[1px] cursor-pointer"
            onClick={() => navigate("/")}
          >
            ShopKart
          </span>
        </div>
      </div>
      {Object.keys(cart).length == 0 ||
      (Object.keys(cart).length != 0 && cart.items.length == 0) ? (
        <div className="text-3xl h-100 justify-center gap-10 font-bold tracking-[1px] font-serif flex flex-col items-center">
          <h1> Cart is Empty</h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            style={button}
          >
            Go Home
          </motion.button>
        </div>
      ) : (
        <div className="w-[90%] flex gap-2 relative flex-col sm:flex-row">
          <div className="sm:w-[70%] border p-2 flex flex-col relative gap-1 rounded-lg">
            {cart?.items?.map((item, idx) => (
              <div key={idx} className="border-b p-2 flex sm:gap-5 flex-wrap">
                <div className="w-full sm:w-fit flex flex-col items-center">
                  <img
                    src={item.product_id.image[0].url}
                    alt="product"
                    className="w-30"
                  />
                  <div className="flex justify-around my-1 rounded-lg p-1 gap-1 min-w-30">
                    <button
                      className="border rounded-lg active:bg-orange-400"
                      onClick={() =>
                        handleQuentity(item.product_id._id, item.quentity - 1)
                      }
                    >
                      <RemoveIcon />
                    </button>
                    <span className="border rounded-lg flex-1 flex justify-center">
                      {item.quentity}
                    </span>
                    <button
                      className="border rounded-lg active:bg-blue-400"
                      onClick={() =>
                        handleQuentity(item.product_id._id, item.quentity + 1)
                      }
                    >
                      <AddIcon />
                    </button>
                  </div>
                  <button
                    className="sm:hidden border px-4 w-40 font-semibold rounded-lg active:bg-orange-500 cursor-pointer"
                    onClick={() => handleQuentity(item.product_id._id, 0)}
                  >
                    REMOVE
                  </button>
                </div>
                <div className="py-2 flex flex-col gap-1 justify-between flex-1">
                  <h1 className="sm:text-xl font-semibold tracking-[1px] tex-sm">
                    {item.product_id.name}
                  </h1>
                  <h1 className="text-sm">{item.product_id.category}</h1>
                  <h1 className="text-sm text-gray-400">
                    Seller : {item.product_id.seller.storeName}
                  </h1>
                  <h1 className="text-2xl font-semibold">
                    ₹{item.product_id.price * item.quentity}
                  </h1>
                  <button
                    className="hidden sm:flex justify-center border px-4 w-40 font-semibold rounded-lg active:bg-orange-500 cursor-pointer"
                    onClick={() => handleQuentity(item.product_id._id, 0)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            id="price"
            className="sm:w-[30%] bg-white w-full sticky bottom-0 sm:top-13 self-start"
          >
            <div className="border h-fit p-1 flex gap-3 flex-col rounded-lg">
              <h1 className="font-semibold ">Price details</h1>
              <div className="border rounded-lg p-1 bg-gray-200 flex flex-col gap-4">
                <div className="border-b flex justify-between border-dashed">
                  <span>MRP</span> <span>₹{cart.total_price}</span>
                </div>
                <div className="border-b flex justify-between border-dashed">
                  <span>Placeform Fee</span> <span>FREE</span>
                </div>
                <div className="text-xl font-semibold flex justify-between">
                  <span>Total Amount</span> <span>₹{cart.total_price}</span>
                </div>
              </div>
              <div
                className="border font-semibold flex justify-center bg-orange-400 active:bg-yellow-300 rounded-lg p-2 cursor-pointer"
                onClick={() => navigate("/place-order")}
              >
                Place Order
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
