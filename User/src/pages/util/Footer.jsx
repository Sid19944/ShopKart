import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Footer() {
  const { mode, isAuthenticated } = useSelector((state) => state.user);
  return (
    <footer
      className={`h-12 ${mode ? "bg-white text-black" : "bg-gray-900 text-white"} sticky bottom-0 left-0 p-1 border-t flex md:hidden w-full justify-around`}
    >
      <Link to={"/"} className="flex flex-col items-center">
        <HomeIcon style={{ height: "25px", width: "25px" }} />
        <span className="text-xs">Home</span>
      </Link>
      <Link
        to={isAuthenticated ? "/account" : "/login"}
        className="flex flex-col items-center"
      >
        <AccountCircleIcon style={{ height: "25px", width: "25px" }} />
        <span className="text-xs">Account</span>
      </Link>
      <Link
        to={isAuthenticated ? "/cart" : "/login"}
        className="flex flex-col items-center"
      >
        <ShoppingCartIcon style={{ height: "25px", width: "25px" }} />
        <span className="text-xs">Cart</span>
      </Link>
    </footer>
  );
}

export default Footer;
