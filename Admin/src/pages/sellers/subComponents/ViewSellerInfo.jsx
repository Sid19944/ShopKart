import React from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

function ViewSellerInfo({ remove }) {
  const { seller } = useSelector((state) => state.sellers);
  const { users } = useSelector((state) => state.users);

  const user = users.filter((user) => user._id == seller.seller_id);

  return (
    <div className="border bg-gray-900 p-2 rounded-lg flex flex-col gap-2 min-w-100">
      <div className="flex justify-between text-lg tracking-[2px]">
        <span className="tracking-[2px] text-blue-700"> SELLERS DETAILS</span>
        <CloseIcon onClick={() => remove()} className="cursor-pointer" />
      </div>

      <div id="user" className="border rounded-lg flex">
        <img src={user[0].avatar} alt="avatar" className="h-32 rounded-l-lg" />
        <div className="flex flex-col p-1 gap-2 w-full">
          <div className="flex w-full gap-2 border-b border-gray-500">
            <label>NEME :</label>
            <h1>{user[0].name}</h1>
          </div>
          <div className="flex w-full gap-2 border-b border-gray-500">
            <label>STORE :</label>
            <h1>{seller.storeName}</h1>
          </div>
          <div className="flex w-full gap-2 border-b border-gray-500">
            <label>Role :</label>
            <h1
              className={`${user[0].role == "admin" && "text-blue-500"} ${user[0].role == "seller" && "text-yellow-500"} `}
            >
              {user[0].role}
            </h1>
          </div>
           <div className="flex w-full gap-2 border-b border-gray-500">
          <label>Total Products :</label>
          <h1>{seller.products.length}</h1>
        </div>
        </div>
      </div>
      

      <button className="outline rounded-lg bg-blue-400 font-semibold tracking-[2px] cursor-pointer active:bg-blue-600">
        GET FULL DETAIL
      </button>
    </div>
  );
}

export default ViewSellerInfo;
