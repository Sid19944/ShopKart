import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import GroupIcon from "@mui/icons-material/Group";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../store/slice/users.slice";
import AllUsers from "./subComponents/AllUsers";
import BlockUsers from "./subComponents/BlockUsers";

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [showData, setShowData] = useState("allUser");

  const today = new Date().setHours(0, 0, 0, 0);
  const sevenDayBefore =
    new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000;
  const thirtyDayBefore =
    new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000;

  const allDates = [];
  users.map((user) => {
    allDates.push(new Date(user.createdAt).setHours(0, 0, 0, 0));
  });

  let lastSevenDaysRegisters = allDates.filter(
    (date) => date >= sevenDayBefore,
  );
  let lastThirtyDaysRegisters = allDates.filter(
    (date) => date >= thirtyDayBefore,
  );

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  return (
    <div className="p-1 font-mono h-full flex flex-col">
      <div id="page info">
        <h1 className="text-3xl tracking-[2px]">USER MANAGEMENT</h1>
        <p className="text-xs text-gray-400">
          Oversee, Verify, and manage users across the ShopCart
        </p>
      </div>
      <div id="top" className="grid grid-cols-3 gap-4 my-3">
        <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
          <label
            htmlFor=""
            className="flex gap-5 text-gray-400 items-center tracking-[1px]"
          >
            TOTAL REGISTERED USER
            <span className="text-blue-600">
              <GroupIcon />
            </span>
          </label>
          <h1 className="text-3xl flex flex-col gap-3">
            <CountUp end={users.length} duration={2} />
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
            <CountUp end={lastThirtyDaysRegisters.length} duration={2} />
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
            <CountUp end={users.length} duration={2} />
            <span className="text-green-500 text-sm flex items-baseline gap-2">
              <QueryStatsIcon /> +
              {(lastSevenDaysRegisters.length * 100) / allDates.length}%
            </span>
          </h1>
        </div>
      </div>

      <div
        id="user_manage"
        className="border p-1 rounded-lg flex flex-col overflow-y-auto"
      >
        <nav className="flex gap-3 p-2 justify-end bg-gray-900 rounded-t-lg">
          <span
            className={`p-2 rounded-lg font-semibold text-blue-700 outline cursor-pointer ${showData == "allUser" ? "bg-blue-300" : "blur-[0.4px]"}`}
            onClick={() => setShowData("allUser")}
          >
            All Users
          </span>
          <span
            className={`p-2 rounded-lg text-blue-700 font-semibold outline cursor-pointer ${showData == "blockUser" ? "bg-blue-300" : "blur-[0.4px]"}`}
            onClick={() => setShowData("blockUser")}
          >
            Block Users
          </span>
        </nav>
        <div className="flex justify-around py-2 px-2 border-b border-gray-400 ">
          <span className="w-[25%] font-semibold text-xl tracking-[2px]">
            NAME
          </span>
          <span className="w-[25%] font-semibold text-xl tracking-[2px]">
            CATEGORY
          </span>
          <span className="w-[25%] font-semibold text-xl tracking-[2px]">
            STAUS
          </span>
          <span className="w-[25%] text-center font-semibold text-xl tracking-[2px]">
            ACTIONS
          </span>
        </div>

        <div className="my-2 flex flex-col overflow-auto">
          {(() => {
            switch (showData) {
              case "allUser":
                return <AllUsers />;
              case "blockUser":
                return <BlockUsers />;
              default:
                return "INVALID SELECTION";
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default Users;
