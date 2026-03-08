import React, { lazy, useEffect, useState } from "react";

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

import LightModeIcon from "@mui/icons-material/LightMode";
import BedtimeIcon from "@mui/icons-material/Bedtime";

import { useDispatch, useSelector } from "react-redux";
import { getUser, logout, setMode } from "../store/slice/user.slice";

import { Suspense } from "react";
import { Link } from "react-router-dom";
import Account from "./account/Account";
import Footer from "./util/Footer";
import { getProducts } from "../store/slice/product.slice";
import toast from "react-hot-toast";
const ViewData = lazy(() => import("./products/ViewData"));

function Home() {
  const [loginHover, setLoginHover] = useState(false);
  const dispatch = useDispatch();
  const { mode, user, isAuthenticated, error, message } = useSelector(
    (state) => state.user,
  );
  const { products } = useSelector((state) => state.products);

  const fashon = products.filter((prod) => prod.category == "fashon");
  const electronics = products.filter((prod) => prod.category == "electronics");
  const mobile = products.filter((prod) => prod.category == "mobile");
  const [category, setCategory] = useState("");

  useEffect(() => {
    message && toast.success(message);
  }, [error, message]);

  useEffect(() => {
    dispatch(getProducts(1));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getUser());
    }, 500);
  }, [isAuthenticated]);

  const handleMode = () => {
    dispatch(setMode(!mode));
  };
  return (
    <div
      className={`h-screen flex flex-col font-mono ${mode ? "bg-white text-black" : "bg-gray-900 text-white"} overflow-auto items-center`}
    >
      <div className="flex items-center justify-between flex-wrap p-0.5 w-full">
        <div className="flex border px-2 py-1 items-center gap-2 bg-blue-600 rounded-full">
          <img src="logo.png" alt="logo" className="h-8 rounded-full" />
          <span className="text-white font-semibold tracking-[1px]">
            ShopCart
          </span>
        </div>
      </div>

      {/* desktop nav */}
      <nav
        className={`h-fit gap-2 flex-col border-b pb-2 w-full md:w-[80%] flex sticky top-0 ${mode ? "bg-white text-black" : "bg-gray-900 text-white"} p-1`}
      >
        <div className="flex">
          <div className="border-2 border-blue-600 md:w-[75%] w-full rounded-lg flex items-center p-1">
            <SearchIcon />
            <input type="text" className="w-full outline-none" />
          </div>
          <div className="hidden md:flex items-center justify-around">
            <div id="account" className="flex px-3 relative group py-1">
              <AccountCircleIcon />
              <span
                className="cursor-pointer"
                onClick={() => setLoginHover(!loginHover)}
              >
                {isAuthenticated ? user.name.split(" ")[0] : "Account"}
              </span>
              <span
                className={`group-hover:rotate-180 ${loginHover && "rotate-180"} duration-500`}
                onClick={() => setLoginHover(!loginHover)}
              >
                <KeyboardArrowDownIcon />
              </span>
              <div
                className={`absolute hover:absolute top-7 ${mode ? "bg-white text-black" : "bg-gray-900 text-white"} shadow-[0px_0px_3px_3px] shadow-blue-300 right-0 mt-1 ${loginHover ? "flex" : "hidden"} group-hover:flex flex-col min-w-60 px-3 py-2 gap-3 rounded-lg font-semibold `}
              >
                <div className="flex gap-2 p-1 rounded-lg items-center">
                  {isAuthenticated ? (
                    <span className={`font-bold text-xl`}>Your Account</span>
                  ) : (
                    <Link to={"/login"} className={`text-blue-600`}>
                      SingUp/Login
                    </Link>
                  )}
                </div>
                <Link
                  to={isAuthenticated ? "/account" : "/login"}
                  className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg"
                >
                  <AccountCircleIcon />
                  My Account
                </Link>
                <Link
                  to={isAuthenticated ? "/orders" : "/login"}
                  className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg"
                >
                  <Inventory2Icon />
                  Orders
                </Link>
                <Link
                  to={isAuthenticated ? "/cart" : "/login"}
                  className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg"
                >
                  <ShoppingCartIcon />
                  Cart
                </Link>
                <Link
                  to={isAuthenticated ? "/address" : "/login"}
                  className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg"
                >
                  <LocationPinIcon />
                  All Address
                </Link>

                {user?.role == "seller" ? (
                  <Link
                  to={isAuthenticated ? "/seller-panel" : "/login"}
                  className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg"
                >
                  <StorefrontIcon />
                  Seller Hub
                </Link>
                ) : (
                  <Link
                    to={isAuthenticated ? "/become-seller" : "/login"}
                    className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg"
                  >
                    <StorefrontIcon />
                    Become a Seller
                  </Link>
                )}

                <div className="flex gap-2">
                  <button
                    className={`w-14 h-7 rounded-full cursor-pointer flex items-center ${mode ? "bg-gray-500" : "bg-blue-500"} `}
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
                  {mode ? "Light Mode" : "Dark Mode"}
                </div>
                {isAuthenticated && (
                  <Link
                    onClick={() => dispatch(logout())}
                    className="flex gap-2 hover:bg-gradient-to-r from-blue-300 to-white p-1 rounded-lg"
                  >
                    <LogoutIcon />
                    Logout
                  </Link>
                )}
              </div>
            </div>
            <Link to={"/cart"} id="cart" className="flex px-3 py-1 group">
              <ShoppingCartIcon />
              <h1>Cart</h1>
            </Link>
          </div>
        </div>
        <div className="flex justify-between">
          <h1
            className={`border px-3 rounded-lg hover:bg-blue-500 cursor-pointer  ${category == "fashon" && "bg-blue-600 text-white"}`}
            onClick={() => setCategory(category != "fashon" ? "fashon" : "")}
          >
            Fashon
          </h1>
          <h1
            className={`border px-3 rounded-lg hover:bg-blue-500 cursor-pointer  ${category == "electronics" && "bg-blue-600 text-white"}`}
            onClick={() =>
              setCategory(category != "electronics" ? "electronics" : "")
            }
          >
            Electronics
          </h1>
          <h1
            className={`border px-3 rounded-lg hover:bg-blue-500 cursor-pointer ${category == "mobile" && "bg-blue-600 text-white"}`}
            onClick={() => setCategory(category != "mobile" ? "mobile" : "")}
          >
            Mobiles
          </h1>
        </div>
      </nav>

      <div
        id="view-area"
        className={`flex-1 md:w-[80%] p-1 gap-2  flex flex-col`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ViewData category={category} />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
