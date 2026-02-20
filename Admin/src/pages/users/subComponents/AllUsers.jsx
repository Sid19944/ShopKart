import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useDispatch, useSelector } from "react-redux";
import {
  approveUser,
  blockUser,
  setSingleUser,
} from "../../../store/slice/users.slice";
import ViewUser from "./ViewUser";

import {motion} from "motion/react"

function AllUsers() {
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [showUser, setShowUser] = useState(false);
  const [showLoad, setShowLoad] = useState(null);

  const handleUserApprove = async (user_id) => {
    setShowLoad(user_id);
    await dispatch(approveUser(user_id));
    setShowLoad(null);
  };

  const handleUserBlock = async (user_id) => {
    setShowLoad(user_id);
    await dispatch(blockUser(user_id));
    setShowLoad(null);
  };

  const handleViewUser = (user_id) => {
    setShowUser(!showUser);
    const user = users.filter((user) => user._id == user_id);
    dispatch(setSingleUser(user[0]));
  };
  return (
    <>
      {users.map((user, idx) => (
        <motion.li
          initial={{ x: -400, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false }}
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
            {!user.isApproved ? (
              <button
                disabled={loading}
                className={`outline px-3 rounded-lg  text-blue-600 active:bg-blue-600 active:text-white ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => handleUserApprove(user._id)}
              >
                {showLoad == user._id ? (
                  <div className="flex w-20 justify-center">
                    <span className="border-2 h-5 w-5 flex border-t-black rounded-full animate-spin"></span>
                  </div>
                ) : (
                  "Approved"
                )}
              </button>
            ) : (
              <button
                className={`outline px-3 rounded-lg  active:bg-red-600 text-red-600 active:text-white ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => handleUserBlock(user._id)}
              >
                {showLoad == user._id ? (
                  <div className="flex w-20 justify-center">
                    <span className="border-2 h-5 w-5 flex border-t-black rounded-full animate-spin"></span>
                  </div>
                ) : (
                  "Block"
                )}
              </button>
            )}

            <button
              className="text-green-500 cursor-pointer border px-2 rounded-lg flex items-center"
              onClick={() => handleViewUser(user._id)}
            >
              <RemoveRedEyeIcon />
            </button>
          </span>
        </motion.li>
      ))}

      {showUser && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ViewUser remove={() => setShowUser(!showUser)} />
        </div>
      )}
    </>
  );
}

export default AllUsers;
