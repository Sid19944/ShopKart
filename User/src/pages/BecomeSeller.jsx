import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressUrl, sellerUrl } from "../Api";
import { getAddress } from "../store/slice/address.slice";
import { useState } from "react";

import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BecomeSeller() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { address } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(getAddress());
  }, []);

  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sellerUrl
      .post("/want", { storeName, storeAddress })
      .then((res) => toast.success(res.data.message))
      .catch((err) => toast.error(err?.response?.data?.message || err.message));
  };

  return (
    <div>
      <form className="p-1 gap-1 flex flex-col">
        <div className="flex flex-col border p-2 rounded-lg">
          <label htmlFor="storeName" className="font-semibold">
            StorecName
          </label>
          <input
            type="text"
            name="storeName"
            className="border outline-none p-1 rounded-lg"
            placeholder="Enter Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="storeAddress" className="font-semibold">
            Select Store Address
          </label>
          {address?.map((addres) => (
            <div
              key={addres._id}
              name="storeAddress"
              className={`flex gap-2 items-center border p-1 rounded-lg ${storeAddress == addres._id && "bg-blue-200"}`}
              onClick={() => setStoreAddress(addres._id)}
            >
              {storeAddress == addres._id ? (
                <CheckBoxOutlinedIcon className="bg-blue-700 text-white" />
              ) : (
                <CheckBoxOutlineBlankOutlinedIcon />
              )}
              <div className="flex flex-col">
                <span>{addres.fullname},</span>
                <span>{addres.number},</span>
                <span>{addres.addressLine},</span>
                <span>{addres.region},</span>
                <span>{addres.district}</span>
                <span>{addres.state}</span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="border w-full rounded-lg p-1 bg-blue-400 active:bg-blue-600 text-white cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default BecomeSeller;
