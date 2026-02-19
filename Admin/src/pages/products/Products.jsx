import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import toast from "react-hot-toast";

import GroupIcon from "@mui/icons-material/Group";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slice/products.slice";
import AllProducts from "./subComponent/AllProducts";

function Products() {
  const dispatch = useDispatch();
  const { products, loading, error, message } = useSelector(
    (state) => state.products,
  );

  const [showData, setShowData] = useState("allCategory");

  const today = new Date().setHours(0, 0, 0, 0);
  const sevenDayBefore =
    new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000;
  const thirtyDayBefore =
    new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000;

  const allDates = [];
  products.map((product) => {
    allDates.push(new Date(product.createdAt).setHours(0, 0, 0, 0));
  });

  let lastSevenDaysRegisters = allDates.filter(
    (date) => date >= sevenDayBefore,
  );
  let lastThirtyDaysRegisters = allDates.filter(
    (date) => date >= thirtyDayBefore,
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
    dispatch(getAllProducts());
  }, [error, message]);

  return (
    <div className="p-1 font-mono h-full flex flex-col">
      <div id="page info">
        <h1 className="text-3xl tracking-[2px]">
          PRODUCT INVENTORY MANAGEMENT
        </h1>
        <p className="text-xs text-gray-400">
          Oversee, Verify, and Manage products across the ShopCart
        </p>
      </div>

      <div id="top" className="grid grid-cols-3 gap-4 my-3 h-25">
        <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
          <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
            TOTAL PRODUCTS
            <span className="text-blue-600">
              <GroupIcon />
            </span>
          </label>
          <h1 className="text-3xl flex gap-3">
            <CountUp end={products.length} duration={2} />
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
          <h1 className="text-3xl flex gap-3">
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
          <h1 className="text-3xl flex gap-3">
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
        <div className="w-full rounded-lg p-2 my-1 flex gap-2">
          <input type="text" className="p-1 border w-full rounded-lg bg-gray-500" placeholder="Search Product"/>
          <button className="border rounded-lg px-3 bg-blue-400 active:bg-blue-600 cursor-pointer">Search</button>
        </div>
        <nav className="flex gap-3 p-2 justify-between bg-gray-900 rounded-t-lg sticky-top top-0">
          <span
            className={`p-2 px-4 rounded-lg font-semibold text-blue-700 outline cursor-pointer`}
          >
            {/* {showData == "allSeller" ? sellers.length : blockSellers.length} */}
          </span>
          <div className="flex gap-2 text-sm">
            <div className="border p-1 px-2 rounded-lg bg-gray-700">
              <span>CATEGORY : </span>
              <select
                name="category"
                id="category"
                className="bg-gray-700 rounded-lg px-2 outline-none cursor-pointer"
              >
                <option value="allCategory">All Category</option>
                <option value="fashon">Fashon</option>
                <option value="mobile">Mobile</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
            <div className="border p-1 px-2 rounded-lg bg-gray-700 ">
              <span>STATUS : </span>
              <select
                name="stock"
                id="stock"
                className="bg-gray-700 rounded-lg px-2 outline-none cursor-pointer"
              >
                <option value="allStockLevels">All Stock Levels</option>
                <option value="inStock">In Stock</option>
                <option value="lowStock">Low Stock</option>
                <option value="outOFStock">Out Of Stock</option>
              </select>
            </div>
            <div className="border p-1 px-2 rounded-lg bg-gray-700">
              <span>VISIBALITY : </span>
              <select
                name="visivality"
                id="visivality"
                className="bg-gray-700 rounded-lg px-2 outline-none cursor-pointer"
              >
                <option value="active&draft">Active & Draft</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </nav>
        <div className="flex justify-around py-2 px-2 border-b border-gray-400">
          <span className="w-[28%] font-semibold text-xl tracking-[2px]">
            PRODUCT
          </span>
          <span className="w-[10%] font-semibold text-xl tracking-[2px]">
            CATEGORY
          </span>
          <span className="w-[10%] text-center font-semibold text-xl tracking-[2px]">
            PRICE
          </span>
          <span className="w-[10%] text-center font-semibold text-xl tracking-[2px]">
            STOCK
          </span>
          <span className="w-[10%] text-center font-semibold text-xl tracking-[2px]">
            VISIVALITY
          </span>
          <span className="w-[30%] text-center font-semibold text-xl tracking-[2px]">
            ACTIONS
          </span>
        </div>

        <div className="flex flex-col overflow-auto">
          {(() => {
            switch (showData) {
              case "allCategory":
                return <AllProducts />;
              case "blockSeller":
                return;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default Products;
