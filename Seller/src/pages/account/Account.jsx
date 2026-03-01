import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getSeller } from "../../store/slice/user.slice";

import LogoutIcon from "@mui/icons-material/Logout";
import toast from "react-hot-toast";

function Account() {
  const dispatch = useDispatch();
  const { user, seller, mode } = useSelector((state) => state.user);
  const { address } = useSelector((state) => state.address);

  const addres = address.filter((add) => add._id == seller.storeAddress);

  const handleDelete = (address_id) => {
    if (seller.storeAddress == address_id)
      return toast.error("You can't delete seleceted address", {
        position: "top-center",
      });
  };
  useEffect(() => {}, []);

  return (
    <div
      className={`flex h-full p-1 gap-2 ${mode ? "bg-gray-400" : "bg-gray-900"}`}
    >
      <div
        className={`flex flex-col border rounded-lg p-3 gap-1 ${mode ? "bg-gray-300" : "bg-gray-900"}`}
      >
        <div
          className="border p-2 rounded-lg cursor-pointer mb-3"
          onClick={() => {
            console.log("Logout");
          }}
        >
          <LogoutIcon />
          Logout
        </div>
        <div className={`flex px-2 gap-2 text-gray-400`}>
          <label htmlFor="id">ID : </label>
          <h1>{user._id}</h1>
        </div>

        <div className={`flex gap-2`}>
          <label htmlFor="name" className="font-semibold">
            Name :
          </label>
          <h1>{user.name}</h1>
        </div>

        <div className={`flex gap-2`}>
          <label htmlFor="store" className="font-semibold">
            Store Name :
          </label>
          <h1>{seller.storeName}</h1>
        </div>
        <div className={`flex gap-2 flex-col`}>
          <label htmlFor="curr-address" className="font-semibold">
            Current Store Address :
          </label>
          <div className="flex flex-col border w-fit p-2 rounded-lg">
            <span>{addres[0]?.addressLine},</span>
            <span>{addres[0]?.postOffice},</span>
            <span>{addres[0]?.pincode},</span>
            <span>{addres[0]?.district},</span>
            <span>{addres[0]?.state},</span>
            <span>{addres[0]?.country}</span>
          </div>
        </div>
      </div>
      <div
        className={`border flex-1 p-2 rounded-lg ${mode ? "bg-gray-300" : "bg-gray-800"}`}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-semibold">All Address</h1>
          <button className="border p-2 px-3 rounded-lg bg-blue-400 active:bg-blue-600 cursor-pointer">
            Add New Address
          </button>
        </div>
        <div className="gap-3 mt-2 flex flex-wrap">
          {address?.map((addres, idx) => (
            <div
              key={idx}
              className={`flex flex-col border w-fit p-2 rounded-lg ${mode ? "bg-white" : "bg-gray-900"}`}
            >
              <span>{addres?.addressLine},</span>
              <span>{addres?.postOffice},</span>
              <span>{addres?.pincode},</span>
              <span>{addres?.district},</span>
              <span>{addres?.state},</span>
              <span>{addres?.country}</span>
              <div className="flex  gap-2">
                <button
                  disabled={addres._id == seller.storeAddress}
                  className={`border px-2 rounded-lg cursor-pointer text-blue-700 bg-blue-400 active:bg-blue-700  active:text-white ${addres._id == seller.storeAddress && "bg-gray-400 text-gray-500"} disabled:cursor-not-allowed`}
                >
                  Select
                </button>
                <button className="border px-2 rounded-lg cursor-pointer text-green-700 bg-green-500 active:bg-green-700 active:text-white">
                  Edit
                </button>
                <button
                  className={`border px-2 rounded-lg cursor-pointer text-red-700 bg-red-400 active:bg-red-700 active:text-white `}
                  onClick={() => handleDelete(addres._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Account;
