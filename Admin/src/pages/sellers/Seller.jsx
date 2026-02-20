import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import toast from "react-hot-toast";

import GroupIcon from "@mui/icons-material/Group";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useDispatch, useSelector } from "react-redux";
import { getSellers } from "../../store/slice/seller.sclic";
import AllSeller from "./subComponents/AllSeller";
import BlockSeller from "./subComponents/BlockSeller";

function Seller() {
  const dispatch = useDispatch();
  const { sellers, sellerError, sellerMessage } = useSelector(
    (state) => state.sellers,
  );
  const [showData, setShowData] = useState("allSeller");

  const blockSellers = sellers.filter((seller) => seller.isApproved != true);

  const today = new Date().setHours(0, 0, 0, 0);
  const sevenDayBefore =
    new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000;
  const thirtyDayBefore =
    new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000;

  const allDates = [];
  sellers.map((seller) => {
    allDates.push(new Date(seller.createdAt).setHours(0, 0, 0, 0));
  });

  let lastSevenDaysRegisters = allDates.filter(
    (date) => date >= sevenDayBefore,
  );
  let lastThirtyDaysRegisters = allDates.filter(
    (date) => date >= thirtyDayBefore,
  );

  useEffect(() => {
    if (sellerError) {
      toast.error(sellerError);
    }
    if (sellerMessage) {
      toast.success(sellerMessage);
    }
    dispatch(getSellers());
  }, [sellerError, sellerMessage]);
  return (
    <div className="p-1 font-mono h-full flex flex-col">
      <div id="page info">
        <h1 className="text-3xl tracking-[2px]">SELLER MANAGEMENT</h1>
        <p className="text-xs text-gray-400">
          Oversee, Verify, and Manage sellers across the ShopCart
        </p>
      </div>
      <div id="top" className="grid grid-cols-3 gap-4 my-3">
        <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
          <label
            htmlFor=""
            className="flex gap-5 text-gray-400 items-center tracking-[1px]"
          >
            TOTAL REGISTERED SELLER
            <span className="text-blue-600">
              <GroupIcon />
            </span>
          </label>
          <h1 className="text-3xl flex flex-col gap-3">
            <CountUp end={sellers.length} duration={2} />
            <span className="text-green-500 text-sm flex items-baseline gap-2">
              <QueryStatsIcon />
            </span>
          </h1>
        </div>
        <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
          <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
            LAST 7 DAYS{" "}
            <span className="text-blue-600">
              <GroupIcon />
            </span>
          </label>
          <h1 className="text-3xl flex flex-col gap-3">
            <CountUp end={lastSevenDaysRegisters.length} duration={2} />
            <span className="text-green-500 text-sm flex items-baseline gap-2">
              <QueryStatsIcon /> +
              {(lastSevenDaysRegisters.length * 100) / allDates.length}%
            </span>
          </h1>
        </div>

        <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
          <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
            LAST 30 DAYS{" "}
            <span className="text-blue-600">
              <GroupIcon />
            </span>
          </label>
          <h1 className="text-3xl flex flex-col gap-3">
            <CountUp end={lastThirtyDaysRegisters.length} duration={2} />
            <span className="text-green-500 text-sm flex items-baseline gap-2">
              <QueryStatsIcon /> +
              {(lastThirtyDaysRegisters.length * 100) / allDates.length}%
            </span>
          </h1>
        </div>
      </div>

      <div
        id="viewing"
        className="border rounded-lg p-1 flex flex-col overflow-y-auto"
      >
        <nav className="flex gap-3 p-2 justify-between bg-gray-900 rounded-t-lg">
          <span
            className={`p-2 px-4 rounded-lg font-semibold text-blue-700 outline cursor-pointer`}
          >
            {showData == "allSeller" ? sellers.length : blockSellers.length}
          </span>
          <div className="flex gap-2">
            <span
              className={`p-2 rounded-lg font-semibold text-blue-700 outline cursor-pointer  ${showData == "allSeller" ? "bg-blue-300" : "blur-[0.4px]"}`}
              onClick={() => setShowData("allSeller")}
            >
              All Sellers
            </span>
            <span
              className={`relative p-2 rounded-lg text-blue-700 font-semibold outline cursor-pointer  ${showData == "blockSeller" ? "bg-blue-300" : "blur-[0.4px]"}`}
              onClick={() => setShowData("blockSeller")}
            >
              {blockSellers.length > 0 && (
                <span className="absolute -top-2 -left-2 border rounded-full bg-red-700 text-white flex items-center justify-center text-sm min-w-6 min-h-6">
                  {blockSellers.length}
                </span>
              )}
              Block Sellers
            </span>
          </div>
        </nav>
        <div className="flex justify-around py-2 px-2 border-b border-gray-400 ">
          <span className="w-[40%] font-semibold text-xl tracking-[2px]">
            STORE NAME
          </span>
          <span className="w-[20%] font-semibold text-xl tracking-[2px]">
            STAUS
          </span>
          <span className="w-[40%] text-center font-semibold text-xl tracking-[2px]">
            ACTIONS
          </span>
        </div>

        <div className="flex flex-col overflow-auto">
          {(() => {
            switch (showData) {
              case "allSeller":
                return <AllSeller />;
              case "blockSeller":
                return <BlockSeller />;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default Seller;
