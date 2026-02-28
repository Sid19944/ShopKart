import React, { lazy, Suspense, useEffect, useState } from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useDispatch, useSelector } from "react-redux";
const Products = lazy(() => import("../Products/Products"));
import { setMode } from "../../store/slice/user.slice";
const Overview = lazy(() => import("../overview/Overview"));
const Orders = lazy(() => import("../Orders/Orders"));
const Account = lazy(() => import("../account/Account"));

function Dashboard() {
  const dispatch = useDispatch();
  const { mode, user } = useSelector((state) => state.user);
  const [showData, setShowData] = useState("account");

  const handleMode = () => {
    dispatch(setMode(!mode));
  };

  return (
    <div
      className={`h-screen flex flex-col font-mono ${mode && "bg-white text-black"} p-1`}
    >
      {/* desktop nav */}
      <nav className="hidden w-full border-b border-gray-400 h-[7%] min-h-11 py-2 px-1 sm:flex justify-between">
        <div className="h-full flex items-center gap-1 text-blue-700 px-1">
          <span className="h-full bg-blue-700 flex items-center rounded-md px-1 text-white">
            <StorefrontIcon className="rounded-lg" />
          </span>
          <span className="font-bold">Seller Hub</span>
        </div>
        <div className="flex gap-2">
          <div
            className={`${showData == "overview" && "border-b-blue-600 font-bold border-b-3 blur-none"} hover:text-yellow-500 cursor-pointer blur-[0.6px] px-3 flex items-center`}
            onClick={() => setShowData("overview")}
          >
            Overview
          </div>
          <div
            className={`${showData == "products" && "border-b-blue-600 font-bold border-b-3 blur-none"} hover:text-yellow-500 cursor-pointer blur-[0.6px] px-3 flex items-center`}
            onClick={() => setShowData("products")}
          >
            Products
          </div>
          <div
            className={`${showData == "orders" && "border-b-blue-600 font-bold border-b-3 blur-none"} hover:text-yellow-500 cursor-pointer blur-[0.6px] px-3 flex items-center`}
            onClick={() => setShowData("orders")}
          >
            Orders
          </div>
        </div>
        <div
          className={`${showData == "account" && "font-bold blur-none"} cursor-pointer flex items-center gap-1`}
        >
          <button
            className={`w-14 h-7 rounded-full flex items-center ${mode ? "bg-gray-500" : "bg-blue-500"} cursor-pointer`}
            onClick={handleMode}
          >
            <span
              className={`w-5 h-5 rounded-full transform transition ${mode ? "translate-x-1" : "translate-x-7.5"} bg-black flex items-center justify-center`}
              style={{ transition: "0.7s" }}
            >
              {mode ? (
                <LightModeIcon
                  style={{ height: "15px", animationDuration: "3s" }}
                  className="text-yellow-600 animate-spin"
                />
              ) : (
                <BedtimeIcon
                  style={{ height: "15px" }}
                  className="text-white"
                />
              )}
            </span>
          </button>
          <div
            onClick={() => setShowData("account")}
            className="hover:text-yellow-500  cursor-pointer flex items-center gap-1 h-full "
          >
            <span>Siddharth</span>
            <img
              src={user.avatar}
              alt="avatar"
              className="h-full rounded-full border"
            />
          </div>
        </div>
      </nav>

      <nav
        id="head"
        className="flex w-full border-b border-gray-400 h-[7%] min-h-11 py-2 px-1 sm:hidden justify-between"
      >
        <div className="h-full flex items-center gap-1 text-blue-700 px-1">
          <span className="h-full bg-blue-700 flex items-center rounded-md px-1 text-white">
            <StorefrontIcon className="rounded-lg" />
          </span>
          <span className="font-bold">Seller Hub</span>
        </div>
        {showData == "overview" && (
          <div>
            <button
              className={`w-14 h-7 rounded-full flex items-center ${mode ? "bg-gray-500" : "bg-blue-500"} `}
              onClick={handleMode}
            >
              <span
                className={`w-5 h-5 rounded-full transform transition ${mode ? "translate-x-1" : "translate-x-7.5"} bg-black flex items-center justify-center`}
                style={{ transition: "0.7s" }}
              >
                {mode ? (
                  <LightModeIcon
                    style={{ height: "15px", animationDuration: "3s" }}
                    className="text-yellow-600 animate-spin"
                  />
                ) : (
                  <BedtimeIcon
                    style={{ height: "15px" }}
                    className="text-white"
                  />
                )}
              </span>
            </button>
          </div>
        )}
      </nav>

      <div className="h-[86%] sm:h-[93%]">
        {(() => {
          switch (showData) {
            case "overview":
              return (
                <Suspense fallback={<div>Loading....</div>}>
                  <Overview />
                </Suspense>
              );
            case "products":
              return (
                <Suspense fallback={<div>Loading...</div>}>
                  <Products />
                </Suspense>
              );
            case "orders":
              return (
                <Suspense fallback={<div>Loading...</div>}>
                  <Orders />
                </Suspense>
              );
            case "account":
              return (
                <Suspense fallback={<div>Loading...</div>}>
                  <Account />
                </Suspense>
              );
            default:
              return "Invalid Selection";
          }
        })()}
      </div>

      {/* mobile nav */}
      <nav className="border-t border-gray-400 h-[7%] min-h-11 flex justify-between sm:hidden">
        <div
          className={`flex flex-col items-center justify-center p-1 blur-[0.5px] ${showData == "overview" && "border-b-3 border-b-blue-500 blur-none"}`}
          onClick={() => setShowData("overview")}
        >
          <DashboardIcon />
          <span className="text-xs text-gray-400">overview</span>
        </div>

        <div
          className={`flex flex-col items-center justify-center p-1 blur-[0.5px] ${showData == "products" && "border-b-3 border-b-blue-500 blur-none"}`}
          onClick={() => setShowData("products")}
        >
          <Inventory2Icon />
          <span className="text-xs text-gray-400">Products</span>
        </div>
        <div
          className={`flex flex-col items-center justify-center p-1 blur-[0.5px] ${showData == "orders" && "border-b-3 border-b-blue-500 blur-none"}`}
          onClick={() => setShowData("orders")}
        >
          <LocalShippingIcon />
          <span className="text-xs text-gray-400">Orders</span>
        </div>
        <div
          className={`flex flex-col items-center justify-center p-1 blur-[0.5px] ${showData == "account" && "border-b-3 border-b-blue-500 blur-none"}`}
          onClick={() => setShowData("account")}
        >
          <AccountBoxIcon />
          <span className="text-xs text-gray-400">Account</span>
        </div>
      </nav>
    </div>
  );
}

export default Dashboard;
