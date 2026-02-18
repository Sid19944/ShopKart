import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useDispatch, useSelector } from "react-redux";
import { approveUser, blockUser, setSingleUser } from "../../../store/slice/users.slice";
import ViewUser from "./ViewUser";

function AllUsers() {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [showUser, setShowUser] = useState(false);

  const handleUserApprove = (user_id) => {
    dispatch(approveUser(user_id));
  };

  const handleUserBlock = (user_id) => {
    dispatch(blockUser(user_id));
  };

  const handleViewUser = (user_id) => {
    setShowUser(!showUser);
    const user = users.filter((user)=>user._id == user_id)
    dispatch(setSingleUser(user[0]))
  };
  return (
    <>
      {users.map((user, idx) => (
        <li
          key={idx}
          className={`flex justify-around border-gray-700 border-b p-2 gap-2 ${showUser && "blur-[2px]"}`}
        >
          <span className="text-xl w-[25%] border-r">{user.name}</span>
          <span
            className={`text-xl w-[20%] border-r ${user.role == "admin" && "text-blue-600"} ${user.role == "seller" && "text-yellow-400"}`}
          >
            {user.role}
          </span>
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
            <button
              className="text-green-500 cursor-pointer border px-2 rounded-lg flex items-center"
              onClick={() => handleViewUser(user._id)}
            >
              <RemoveRedEyeIcon />
            </button>
          </span>
        </li>
      ))}

      {showUser && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ViewUser remove={()=>setShowUser(!showUser)}/>
        </div>
      )}
    </>
  );
}

export default AllUsers;
