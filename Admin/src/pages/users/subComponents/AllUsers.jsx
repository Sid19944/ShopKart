import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useDispatch, useSelector } from "react-redux";
import { approveUser, blockUser } from "../../../store/slice/users.slice";

function AllUsers() {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleUserApprove = (user_id) => {
    dispatch(approveUser(user_id));
  };

  const handleUserBlock = (user_id) => {
    dispatch(blockUser(user_id));
  };
  return (
    <>
      {users.map((user, idx) => (
        <li
          key={idx}
          className="flex justify-around border-gray-700 border-b p-2 gap-2"
        >
          <span className="text-xl w-[25%] border-r">{user.name}</span>
          <span className="text-xl w-[20%] border-r">{user.role}</span>
          <span className="text-xl w-[20%] border-r">
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
          <span className="text-xl flex gap-2 w-[35%] justify-center">
            <button
              className={`outline px-3 rounded-lg cursor-pointer ${user.isApproved ? "bg-blue-600" : "text-blue-600"}`}
              onClick={() => handleUserApprove(user._id)}
            >
              Approved
            </button>
            <button
              className={`outline px-3 rounded-lg cursor-pointer ${!user.isApproved ? "bg-red-600" : "text-red-600"}`}
              onClick={() => handleUserBlock(user._id)}
            >
              Block
            </button>
            <button className="text-green-500 cursor-pointer">
              <RemoveRedEyeIcon />
            </button>
          </span>
        </li>
      ))}
    </>
  );
}

export default AllUsers;
