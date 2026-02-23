import React, { useEffect, useState } from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { useSelector } from "react-redux";
import Products from "../Products/Products";

function Dashboard() {
  const { mode } = useSelector((state) => state.user);
  const [showData, setShowData] = useState("dashboard");

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
            className={`${showData == "dashboard" && "border-b-blue-600 font-bold border-b-3 blur-none"} hover:text-yellow-500 cursor-pointer blur-[0.6px] px-3 flex items-center`}
            onClick={() => setShowData("dashboard")}
          >
            Dashboard
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
          className={`${showData == "account" && "border-b-blue-600 font-bold border-b-2 blur-none"} hover:text-yellow-500 cursor-pointer flex items-center gap-1`}
          onClick={() => setShowData("account")}
        >
          <span>Siddharth</span>
          <img
            src="logo.png"
            alt="avatar"
            className="h-full rounded-full border"
          />
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
      </nav>
      <div className="h-[86%] sm:h-[93%] p-1">
        {(() => {
          switch (showData) {
            case "dashboard":
              return "Dashboard";
            case "products":
              return <Products />;
            case "orders":
              return "Orders";
            case "account":
              return "Accont";
            default:
              return "Invalid Selection";
          }
        })()}
      </div>

      {/* mobile nav */}
      <nav className="border-t border-gray-400 h-[7%] min-h-11 flex justify-between sm:hidden">
        <div
          className={`flex flex-col items-center justify-center p-1 blur-[0.5px] ${showData == "dashboard" && "border-b-3 border-b-blue-500 blur-none"}`}
          onClick={() => setShowData("dashboard")}
        >
          <DashboardIcon />
          <span className="text-xs text-gray-400">Dashboard</span>
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
