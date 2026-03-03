import React, { useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeIcon from "@mui/icons-material/Home";

import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../store/slice/user.slice";

import { Suspense } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [showData, setShowData] = useState("overview");
  const { mode, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loginHover, setLoginHover] = useState(false);
  const [moreHover, setMoreHover] = useState(false);

  const handleMode = () => {
    dispatch(setMode(!mode));
  };
  return (
    <div
      className={`h-screen flex flex-col font-mono ${mode && "bg-white text-black"} items-center overflow-auto`}
    >
      <div className="flex items-center justify-between flex-wrap p-0.5 w-full">
        <div className="flex border px-2 py-1 items-center gap-2 bg-blue-600 rounded-full">
          <img src="logo.png" alt="logo" className="h-8 rounded-full" />
          <span className="text-white font-semibold tracking-[1px]">
            ShopCart
          </span>
        </div>
        <div className="px-2 p-1 rounded-full flex items-center">
          <LocationPinIcon style={{ height: "18px", width: "18px" }} />

          <Link className="text-blue-600 underline text-sm">
            Select Delivery Location
            <ArrowForwardIosIcon
              style={{ height: "15px", width: "15px" }}
              className="font-semibold"
            />
          </Link>
        </div>
      </div>

      {/* desktop nav */}
      <nav className="h-fit gap-2 border-b pb-2 w-full flex sticky top-0 bg-white p-1">
        <div className="border-2 border-blue-600 md:w-[70%] w-full rounded-lg flex items-center p-1">
          <SearchIcon />
          <input type="text" className="w-full outline-none" />
        </div>
        <div className="hidden md:flex items-center justify-around">
          <div id="login" className="flex px-3 relative group py-1">
            <AccountCircleIcon />
            <span
              onClick={() => setLoginHover(!loginHover)}
              className="cursor-pointer"
            >
              Account
            </span>
            <span
              className={`group-hover:rotate-180 ${loginHover && "rotate-180"} duration-500`}
            >
              <KeyboardArrowDownIcon />
            </span>
            <div
              className={`absolute hover:absolute top-7 bg-white shadow-[0px_0px_3px_3px] shadow-blue-300 right-0 mt-1 ${loginHover ? "flex" : "hidden"} group-hover:flex flex-col min-w-60 px-3 py-2 gap-3 rounded-lg font-semibold `}
            >
              <Link className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg items-center">
                <span className="text-blue-600">SingUp/Login</span>
              </Link>
              <Link className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg">
                <AccountCircleIcon />
                My Account
              </Link>
              <Link className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg">
                <Inventory2Icon />
                Orders
              </Link>

              <Link className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg">
                <StorefrontIcon />
                Become a Seller
              </Link>
              <Link className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg">
                <LogoutIcon />
                Logout
              </Link>
            </div>
          </div>
          <div id="more" className="flex px-3 py-1 group relative">
            <span
              onClick={() => setMoreHover(!moreHover)}
              className="cursor-pointer"
            >
              More
            </span>
            <span
              className={`group-hover:rotate-180 ${moreHover && "rotate-180"} duration-500`}
            >
              <KeyboardArrowDownIcon />
            </span>
            <div
              className={`absolute hover:absolute top-7 bg-white shadow-[0px_0px_3px_3px] shadow-blue-300 right-0  mt-1 group-hover:flex ${moreHover ? "flex" : "hidden"} flex-col min-w-60 px-3 py-2 gap-3 rounded-lg font-semibold `}
            >
              <Link className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg items-center">
                <span className="text-lg">New Customer?</span>
                <span className="text-blue-600">SingUp</span>
              </Link>
              <Link className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg">
                <StorefrontIcon />
                Become a Seller
              </Link>
              <Link className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg">
                <LocationPinIcon />
                All Address
              </Link>
              <Link className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg">
                <LogoutIcon />
                Logout
              </Link>
            </div>
          </div>
          <Link id="cart" className="flex px-3 py-1 group">
            <ShoppingCartIcon />
            <h1>Cart</h1>
          </Link>
        </div>
      </nav>
      <div id="view-area" className="flex-1">
        <div className="h-100">a</div>
        <div className="h-100">a</div>
        <div className="h-100">a</div>
        <div className="h-100">a</div>
        <div className="h-100">a</div>
        <div className="h-100">a</div>
        <div className="h-100">a</div>
      </div>

      <footer className="h-12 bg-white sticky bottom-0 left-0 p-1 border-t flex md:hidden w-full justify-around">
        <Link className="flex flex-col items-center">
          <HomeIcon style={{ height: "25px", width: "25px" }} />
          <span className="text-xs">Home</span>
        </Link>
        <Link className="flex flex-col items-center">
          <AccountCircleIcon style={{ height: "25px", width: "25px" }} />
          <span className="text-xs">Account</span>
        </Link>
        <Link className="flex flex-col items-center">
          <ShoppingCartIcon style={{ height: "25px", width: "25px" }} />
          <span className="text-xs">Cart</span>
        </Link>
      </footer>
    </div>
  );
}

export default Home;
