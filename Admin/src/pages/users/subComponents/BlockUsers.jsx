import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useSelector } from "react-redux";

function BlockUsers() {
  const { users } = useSelector((state) => state.users);
  const blockUser = users.filter((user) => user.isApproved == false);

  return (
    <>
      {blockUser.length ? (
        blockUser.map((user, idx) => (
          <li
            key={idx}
            className="flex justify-around border-gray-700 border-b p-2 gap-2"
          >
            <span className="text-xl w-[25%] border-r">{user.name}</span>
            <span className="text-xl w-[25%] border-r">{user.role}</span>
            <span className="text-xl w-[25%] border-r">
              {user.isApproved ? (
                <div className="flex items-center gap-1">
                  <CheckCircleIcon
                    className="text-green-500"
                    style={{ height: "15px" }}
                  />{" "}
                  <span>Approved</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <CancelIcon
                    className="text-red-500"
                    style={{ height: "15px" }}
                  />{" "}
                  <span>Block</span>
                </div>
              )}
            </span>
            <span className="text-xl flex gap-2 w-[25%] justify-center">
              <button
                className={`outline px-3 rounded-lg cursor-pointer ${user.isApproved ? "bg-blue-600" : "text-blue-600"}`}
              >
                Approved
              </button>
              <button
                className={`outline px-3 rounded-lg cursor-pointer ${!user.isApproved ? "bg-red-600" : "text-red-600"}`}
              >
                Block
              </button>
              <button className="text-green-500 cursor-pointer">
                <RemoveRedEyeIcon />
              </button>
            </span>
          </li>
        ))
      ) : (
        <h1 className="text-3xl text-center text-blue-600 font-extrabold tracking-[2px] ">
          No User Block yet.
        </h1>
      )}
    </>
  );
}

export default BlockUsers;
