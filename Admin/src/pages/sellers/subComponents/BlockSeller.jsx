import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useDispatch, useSelector } from "react-redux";
import {
  approveSeller,
  blockSeller,
  setSingleSeller,
} from "../../../store/slice/seller.sclic";

import Viewseller from "./ViewSellerInfo";
import { motion } from "motion/react";

function BlockSeller({sellers}) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.sellers);
  const blockSellers = sellers.filter((seller) => seller.isApproved == false);
  const [showLoad, setShowLoad] = useState(null);
  const [showSeller, setShowSeller] = useState(false);

  const handleSellerApprove = async (seller_id) => {
    setShowLoad(seller_id);
    await dispatch(approveSeller(seller_id));
    setShowLoad(null);
  };

  const handleSellerBlock = async (seller_id) => {
    setShowLoad(seller_id);
    await dispatch(blockSeller(seller_id));
    setShowLoad(null);
  };

  const handleViewSeller = (seller_id) => {
    setShowSeller(!showSeller);
    const seller = sellers.filter((seller) => seller._id == seller_id);
    dispatch(setSingleSeller(seller[0]));
  };

  return (
    <>
      {blockSellers.length ? (
        blockSellers.map((seller, idx) => (
          <motion.li
            initial={{ x: -400, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
            key={idx}
            className={`flex justify-around border-gray-700 border-b p-2 gap-2 ${showSeller && "blur-[2px]"}`}
          >
            <span className="text-xl w-[40%] border-r">{seller.storeName}</span>
            <span className="text-xl w-[20%] border-r">
              {seller.isApproved ? (
                <div className="flex items-center gap-1">
                  <CheckCircleIcon
                    className="text-green-500"
                    style={{ height: "15px" }}
                  />{" "}
                  <span>Approved</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <CancelIcon
                    className="text-red-500"
                    style={{ height: "15px" }}
                  />{" "}
                  <span>Block</span>
                </div>
              )}
            </span>
            <span className="text-xl flex gap-2 w-[40%] justify-center">
              {!seller.isApproved ? (
                <button
                  disabled={loading}
                  className={`outline px-3 rounded-lg  text-blue-600 active:bg-blue-600 active:text-white ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => handleSellerApprove(seller._id)}
                >
                  {showLoad == seller._id ? (
                    <div className="flex w-20 justify-center">
                      <span className="border-2 h-5 w-5 flex border-t-black rounded-full animate-spin"></span>
                    </div>
                  ) : (
                    "Approved"
                  )}
                </button>
              ) : (
                <button
                  disabled={loading}
                  className={`outline px-3 rounded-lg  active:bg-red-600 text-red-600 active:text-white ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => handleSellerBlock(seller._id)}
                >
                  {showLoad == seller._id ? (
                    <div className="flex w-20 justify-center">
                      <span className="border-2 h-5 w-5 flex border-t-black rounded-full animate-spin"></span>
                    </div>
                  ) : (
                    "Block"
                  )}
                </button>
              )}

              <button
                className="text-green-500 cursor-pointer border px-2 rounded-lg flex items-center"
                onClick={() => handleViewSeller(seller._id)}
              >
                <RemoveRedEyeIcon />
              </button>
            </span>
          </motion.li>
        ))
      ) : (
        <h1 className="text-3xl text-center text-blue-600 font-extrabold tracking-[2px] ">
          No seller Blocked yet.
        </h1>
      )}
      {showSeller && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Viewseller remove={() => setShowSeller(!showSeller)} />
        </div>
      )}
    </>
  );
}

export default BlockSeller;
