import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useSelector } from "react-redux";

function AllUsers() {
  const { users } = useSelector((state) => state.users);
  return (
    <>
      {users.map((user,idx) => (
        <li key={idx} className="flex justify-around border-gray-700 border-b p-2">
          <span className="text-xl w-[25%]">{user.name}</span>
          <span className="text-xl w-[25%]">{user.role}</span>
          <span className="text-xl w-[25%]">
            {user.isApproved ? "Approved" : "Block"}
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
      ))}
    </>
  );
}

export default AllUsers;
