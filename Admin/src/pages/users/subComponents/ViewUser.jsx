import React from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

function ViewUser({ remove }) {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="border bg-gray-900 p-2 rounded-lg flex flex-col gap-2 min-w-100">
      <div className="flex text-lg tracking-[2px] flex-col">
        <div className="flex justify-between">
          <span className="tracking-[2px] text-blue-700"> USER DETAILS</span>
          <CloseIcon onClick={() => remove()} className="cursor-pointer" />
        </div>
        <span className="text-xs text-gray-500">ID : {user._id}</span>
      </div>

      <div className="border rounded-lg flex">
        <img src={user.avatar} alt="avatar" className="h-25 rounded-l-lg" />
        <div className="flex flex-col p-1 gap-2">
          <div className="flex w-full gap-2">
            <label>NEME :</label>
            <h1>{user.name}</h1>
          </div>
          <div className="flex w-full gap-2">
            <label>Role :</label>
            <h1
              className={`${user.role == "admin" && "text-blue-500"} ${user.role == "seller" && "text-yellow-500"} `}
            >
              {user.role}
            </h1>
          </div>
          <div className="flex w-full gap-2">
            <label>Provider :</label>
            <h1>{user.provider}</h1>
          </div>
        </div>
      </div>
      {user.email && (
        <div className="flex w-full gap-2">
          <label>EMAIL ID :</label>
          <h1>{user.email}</h1>
        </div>
      )}
    </div>
  );
}

export default ViewUser;
