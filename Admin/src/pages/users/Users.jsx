import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  let { users, loading, error, message } = useSelector((state) => state.users);

  const blockUser = users.filter((user) => user.isApproved == false);
  const [showData, setShowData] = useState("allUser");
  const [searchByName, setSearchByName] = useState("");
  const [searchByID, setSearchByID] = useState("");

  let showUsers = users;

  // filter by search
  if (searchByName.trim()) {
    showUsers = showUsers.filter((user) =>
      user.name
        .trim()
        .toLowerCase()
        .includes(searchByName.trim().toLowerCase()),
    );
  }
  if (searchByID.trim()) {
    showUsers = showUsers.filter((user) => user._id == searchByID);
  }

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
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [error, message]);

  return (
    <div className="p-1 font-mono h-full flex flex-col overflow-auto">

      <div id="top" className="grid grid-cols-3 gap-4 my-3">
        <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
          <label
            htmlFor=""
            className="flex gap-5 text-gray-400 items-center tracking-[1px]"
          >
            TOTAL USER
            <span className="text-blue-600">
              <GroupIcon />
            </span>
          </label>
          <h1 className="text-3xl flex flex-wrap gap-3">
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
          <h1 className="text-3xl flex flex-wrap gap-3">
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
          <h1 className="text-3xl flex flex-wrap gap-3">
            <CountUp end={lastThirtyDaysRegisters.length} duration={2} />
            <span className="text-green-500 text-sm flex items-baseline gap-2">
              <QueryStatsIcon /> +
              {(lastThirtyDaysRegisters.length * 100) / allDates.length}%
            </span>
          </h1>
        </div>
      </div>

      <div
        id="user_manage"
        className="border p-1 rounded-lg flex flex-col "
      >
        <div id="search tabs" className="flex sticky top-0 bg-black">
          <div
            id="searchByName"
            className="w-full rounded-lg p-2 my-1 flex gap-2"
          >
            <input
              type="text"
              className="p-1 border w-full rounded-lg bg-gray-500"
              placeholder="Search Seller By Store Name"
              defaultValue={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </div>
          <div
            id="searchByID"
            className="w-full rounded-lg p-2 my-1 flex gap-2"
          >
            <input
              type="text"
              className="p-1 border w-full rounded-lg bg-gray-500"
              placeholder="Search Seller By ID"
              defaultValue={searchByID}
              onChange={(e) => setSearchByID(e.target.value)}
            />
          </div>
        </div>
        <nav className="flex gap-3 p-2 justify-between bg-gray-900 rounded-t-lg">
          <span
            className={`p-2 px-4 rounded-lg font-semibold text-yellow-500 outline cursor-pointer`}
          >
            <CountUp
              end={showData == "allUser" ? showUsers.length : blockUser.length}
              duration={2}
            />
          </span>
          <div className="flex gap-2">
            <span
              className={`p-2 rounded-lg font-semibold text-blue-700 outline cursor-pointer ${showData == "allUser" ? "bg-blue-300" : "blur-[0.4px]"}`}
              onClick={() => setShowData("allUser")}
            >
              All Users
            </span>
            <span
              className={`relative p-2 rounded-lg text-blue-700 font-semibold outline cursor-pointer ${showData == "blockUser" ? "bg-blue-300" : "blur-[0.4px]"}`}
              onClick={() => setShowData("blockUser")}
            >
              {blockUser.length > 0 && (
                <span className="absolute -top-2 -left-2 border rounded-full bg-red-700 text-white flex items-center justify-center text-sm min-w-6 min-h-6">
                  {blockUser.length}
                </span>
              )}
              Block Users
            </span>
          </div>
        </nav>
        <div className="flex justify-around py-2 px-2 border-b border-gray-400 ">
          <span className="w-[25%] font-semibold text-xl tracking-[2px]">
            NAME
          </span>
          <span className="w-[20%] font-semibold text-xl tracking-[2px]">
            CATEGORY
          </span>
          <span className="w-[20%] font-semibold text-xl tracking-[2px]">
            STAUS
          </span>
          <span className="w-[35%] text-center font-semibold text-xl tracking-[2px]">
            ACTIONS
          </span>
        </div>

        <div className="my-2 flex flex-col ">
          {(() => {
            switch (showData) {
              case "allUser":
                return <AllUsers users={showUsers} />;
              case "blockUser":
                return <BlockUsers users={showUsers} />;
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
