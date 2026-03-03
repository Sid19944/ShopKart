import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../util/Footer";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import { getUser, logout, setMode } from "../../store/slice/user.slice";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import LightModeIcon from "@mui/icons-material/LightMode";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import CloseIcon from "@mui/icons-material/Close";

import { Link, useNavigate } from "react-router-dom";
import AccountInfo from "./SubComponent/AccountInfo";
import { motion } from "motion/react";

function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode, user, isAuthenticated } = useSelector((state) => state.user);
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 639) {
      setShowAccountInfo(false);
    }
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, [isAuthenticated]);
  const handleMode = () => {
    dispatch(setMode(!mode));
  };
  return (
    <div
      className={`h-screen flex flex-col font-mono ${mode ? "bg-white text-black" : "bg-gray-900 text-white"} overflow-auto`}
    >
      <div className="flex border px-2 py-1 items-center gap-2 bg-blue-600 justify-between ">
        <div className="flex gap-2 items-center">
          <img src="logo.png" alt="logo" className="h-8 rounded-full" />
          <span className="text-white font-semibold tracking-[1px]">
            ShopCart
          </span>
        </div>
        <span className="text-white border rounded-lg px-1">{user.name}</span>
      </div>

      <div className="flex border-2 flex-1 p-1 gap-2">
        <div className="flex-1 ">
          <div className="flex flex-col items-center min-w-60 gap-2">
            <div className="border flex items-center w-full rounded-lg">
              <AccountCircleIcon style={{ height: "60px", width: "60px" }} />
              <div className="flex flex-col text-sm font-semibold tracking-[1px]">
                <span>Hello,</span>
                <span>{user.name}</span>
              </div>
            </div>
            <button
              disabled={window.innerWidth > 639}
              onClick={() => setShowAccountInfo(!showAccountInfo)}
              className={`border w-full flex gap-2 p-2 items-center font-semibold tracking-[1px] rounded-lg hover:bg-gradient-to-r from-blue-400 to-white cursor-pointer sm:bg-blue-500 sm:text-white`}
            >
              <PersonIcon style={{ height: "30px", width: "30px" }} />
              <span className="w-full flex justify-between">
                ACCOUNT INFO
                <ArrowForwardIcon />
              </span>
            </button>
            <Link
              to={"/orders"}
              className="border w-full flex gap-2 p-2 items-center font-semibold tracking-[1px] rounded-lg hover:bg-gradient-to-r from-blue-400 to-white cursor-pointer"
            >
              <Inventory2Icon style={{ height: "30px", width: "30px" }} />
              <span className="w-full flex justify-between">
                MY ORDERS
                <ArrowForwardIcon />
              </span>
            </Link>
            <div className="border w-full flex gap-2 p-2 items-center font-semibold tracking-[1px] rounded-lg hover:bg-gradient-to-r from-blue-400 to-white cursor-pointer">
              <LocationPinIcon style={{ height: "30px", width: "30px" }} />
              <span className="w-full flex justify-between">
                ADDRESS
                <ArrowForwardIcon />
              </span>
            </div>
            <div className="border w-full flex gap-2 p-2 items-center font-semibold tracking-[1px] rounded-lg hover:bg-gradient-to-r from-blue-400 to-white cursor-pointer">
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
            <div
              className="border w-full flex gap-2 p-2 items-center font-semibold tracking-[1px] rounded-lg hover:bg-gradient-to-r from-blue-400 to-white cursor-pointer"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              <PowerSettingsNewIcon style={{ height: "30px", width: "30px" }} />
              <span className="w-full flex justify-between">LOGOUT</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex w-full">
          <AccountInfo user={user} />
        </div>

        {showAccountInfo && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] border rounded-lg"
          >
            <h1
              className="text-end p-2"
              onClick={() => setShowAccountInfo(!showAccountInfo)}
            >
              <CloseIcon />
            </h1>
            <AccountInfo user={user} />
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Account;
