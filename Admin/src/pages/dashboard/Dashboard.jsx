import React, { useEffect, useState } from "react";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { adminUrl } from "../../Api.jsx";
import { useSelector } from "react-redux";
import Users from "../users/Users.jsx";
import Seller from "../sellers/Seller.jsx";
import Products from "../products/Products.jsx";

function Dashboard() {
  const { user, error, message } = useSelector((state) => state.user);
  const [showPage, setShowPage] = useState("overview");

  return (
    <div className="h-screen p-1 font-serif flex gap-2">
      <nav
        id="sidenav"
        className="w-60 h-full shadow-[0px_0px_2px_2px] shadow-white rounded-r-lg"
      >
        <div className="h-13 flex items-center justify-center gap-2 p-1 border-b">
          <ContactEmergencyIcon />
          <p className="font-semibold">Admin Panel</p>
        </div>
        <div className="flex flex-col gap-2 p-1">
          <p className="text-xs text-gray-300 mt-2 px-3">MAIN MENU</p>
          <div
            className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer hover:outline hover:opacity-100  ${showPage == "overview" ? "bg-blue-600 border-b-2" : "opacity-70"}`}
            onClick={() => setShowPage("overview")}
          >
            <DashboardIcon />
            <h1>Overview</h1>
          </div>
          <div
            className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer hover:outline hover:opacity-100 ${showPage == "users" ? "bg-blue-600 border-b-2" : "opacity-70"} `}
            onClick={() => setShowPage("users")}
          >
            <GroupIcon />
            <h1>Users</h1>
          </div>
          <div
            className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer hover:outline hover:opacity-100  ${showPage == "sellers" ? "bg-blue-600 border-b-2" : "opacity-70"} `}
            onClick={() => setShowPage("sellers")}
          >
            <StorefrontIcon />
            Sellers
          </div>
          <div
            className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer hover:outline hover:opacity-100  ${showPage == "products" ? "bg-blue-600 border-b-2" : "opacity-70"} `}
            onClick={() => setShowPage("products")}
          >
            <InventoryIcon />
            Products
          </div>
          <div
            className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer hover:outline hover:opacity-100  ${showPage == "orders" ? "bg-blue-600 border-b-2" : "opacity-70"} `}
            onClick={() => setShowPage("orders")}
          >
            <ShoppingCartIcon />
            <p>Orders</p>
          </div>
          <div
            className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer hover:outline hover:opacity-100 opacity-70`}
          >
            <LogoutIcon />
            <p>Logout</p>
          </div>
        </div>
      </nav>

      <div id="viewing" className="w-full p-1 flex flex-col">
        <nav
          id="top-nav"
          className="border-b p-1 flex items-center gap-2 justify-end"
        >
          <h1 className="flex flex-col items-end text-sm">
            {user.name}
            <span className="text-[10px] text-gray-400">Plateform Admin</span>
          </h1>
          <img
            src={user.avatar}
            alt="avatar"
            className="h-10 rounded-full outline"
          />
        </nav>

        <div id="data" className="overflow-y-auto p-3">
          {(() => {
            switch (showPage) {
              case "overview":
                return "overview";
              case "users":
                return <Users />;
              case "sellers":
                return <Seller />;
              case "products":
                return <Products/>;
              case "orders":
                return "orders";
              default:
                return "INVALID SELECTION";
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
