import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useDispatch, useSelector } from "react-redux";
import {approveSeller, blockSeller, setSingleSeller} from "../../../store/slice/seller.sclic"

import Viewseller from "./ViewSellerInfo";

function BlockSeller() {
  const { sellers } = useSelector((state) => state.sellers);
  const blockSellers = sellers.filter((seller) => seller.isApproved == false);

  const dispatch = useDispatch();
  const [showSeller, setShowSeller] = useState(false);

  const handleSellerApprove = (seller_id) => {
    dispatch(approveSeller(seller_id));
  };

  const handleSellerBlock = (seller_id) => {
    dispatch(blockSeller(seller_id));
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
          <li
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
            <button
              className={`outline px-3 rounded-lg cursor-pointer active:bg-blue-600 ${seller.isApproved ? "bg-blue-400" : "text-blue-600"}`}
              onClick={() => handleSellerApprove(seller._id)}
            >
              Approved
            </button>
            <button
              className={`outline px-3 rounded-lg cursor-pointer ${!seller.isApproved ? "bg-red-600" : "text-red-600"}`}
              onClick={() => handleSellerBlock(seller._id)}
            >
              Block
            </button>
            <button
              className="text-green-500 cursor-pointer border px-2 rounded-lg flex items-center"
              onClick={() => handleViewSeller(seller._id)}
            >
              <RemoveRedEyeIcon />
            </button>
          </span>
        </li>
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
