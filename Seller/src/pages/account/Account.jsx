import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeller, logout } from "../../store/slice/user.slice";
import { useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import toast from "react-hot-toast";
import {
  deleteAddress,
  setSingleAddress,
  updateAddress,
} from "../../store/slice/address.slice";
import { motion } from "motion/react";
import AddNewAddress from "./SubComponent/AddNewAddress";
import { sellerUrl } from "../../Api";
import EditAddress from "./SubComponent/EditAddress";

function Account() {
  const navigate = useNavigate();
  const dragConstraints = useRef(null);
  const dispatch = useDispatch();
  const { user, seller, mode } = useSelector((state) => state.user);
  const { address, addres, error, message } = useSelector(
    (state) => state.address,
  );
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showUpdateAddress, setShowUpdateAddress] = useState(false);

  const selectedAddress = address.filter(
    (add) => add._id == seller.storeAddress,
  );

  const hanldeLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAddNewAddress = () => {
    setShowAddAddress(!showAddAddress);
  };

  const handleUpdateAddress = (address_id) => {
    setShowUpdateAddress(!showUpdateAddress);
    const setAddress = address.filter((single) => single._id == address_id);
    dispatch(setSingleAddress(setAddress[0]));
  };

  const handleDeleteAddress = (address_id) => {
    if (seller.storeAddress == address_id)
      return toast.error("You can't delete seleceted address", {
        position: "top-center",
      });
    dispatch(deleteAddress(address_id));
  };

  const updateStoreAddress = async (address_id) => {
    await sellerUrl
      .put(`/update-seller/${seller._id}`, { storeAddress: address_id })
      .then((res) => {
        toast.success(res.data.message + " " + "Going to refresh page", {
          position: "top-center",
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => toast.error(err?.response?.data?.message || err.message));
  };

  useEffect(() => {
    error && toast.error(error);
    message && toast.success(message);
  }, [error, message]);

  return (
    <div
      ref={dragConstraints}
      className={`flex h-full p-1 gap-2 ${mode ? "bg-gray-400" : "bg-gray-900"} relative `}
    >
      <div
        id="sellerInfo"
        className={`flex flex-col border rounded-lg p-3 gap-1 ${mode ? "bg-gray-300" : "bg-gray-900"} max-w-75`}
      >
        <div
          className="border p-2 rounded-lg cursor-pointer mb-3"
          onClick={hanldeLogout}
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
            <span>{selectedAddress[0]?.fullname},</span>
            <span>{selectedAddress[0]?.addressLine},</span>
            <span>{selectedAddress[0]?.region},</span>
            <span>{selectedAddress[0]?.pincode},</span>
            <span>{selectedAddress[0]?.district},</span>
            <span>{selectedAddress[0]?.state},</span>
            <span>{selectedAddress[0]?.country}</span>
          </div>
        </div>
      </div>

      <div
        id="view"
        className={`border flex-1 p-2 rounded-lg ${mode ? "bg-gray-300" : "bg-gray-800"}`}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-semibold">All Address</h1>
          <button
            className="border p-2 px-3 rounded-lg bg-blue-400 active:bg-blue-600 cursor-pointer"
            onClick={handleAddNewAddress}
          >
            Add New Address
          </button>
        </div>
        <div className="gap-3 mt-2 flex flex-wrap overflow-auto">
          {address?.map((addres, idx) => (
            <div
              key={idx}
              className={`flex flex-col border w-fit p-2 rounded-lg max-w-75 justify-between ${mode ? "bg-white" : "bg-gray-900"}`}
            >
              <div className="flex flex-col">
                <span>{addres?.fullname},</span>
                <span>{addres?.addressLine},</span>
                <span>{addres?.region},</span>
                <span>{addres?.pincode},</span>
                <span>{addres?.district},</span>
                <span>{addres?.state},</span>
                <span>{addres?.country}</span>
              </div>
              <div className="flex  gap-2">
                <button
                  disabled={addres._id == seller.storeAddress}
                  className={`border px-2 rounded-lg cursor-pointer text-blue-700 bg-blue-400 active:bg-blue-700  active:text-white ${addres._id == seller.storeAddress && "bg-gray-400 text-gray-500"} disabled:cursor-not-allowed`}
                  onClick={() => updateStoreAddress(addres._id)}
                >
                  Select
                </button>
                <button
                  className="border px-2 rounded-lg cursor-pointer text-green-700 bg-green-500 active:bg-green-700 active:text-white"
                  onClick={() => handleUpdateAddress(addres._id)}
                >
                  Edit
                </button>
                <button
                  className={`border px-2 rounded-lg cursor-pointer text-red-700 bg-red-400 active:bg-red-700 active:text-white `}
                  onClick={() => handleDeleteAddress(addres._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {showAddAddress && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              drag
              dragConstraints={dragConstraints}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-full sm:w-fit"
            >
              <AddNewAddress
                remove={() => setShowAddAddress(!showAddAddress)}
              />
            </motion.div>
          )}

          {showUpdateAddress && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              drag
              dragConstraints={dragConstraints}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-full sm:w-fit"
            >
              <EditAddress
                remove={() => setShowUpdateAddress(!showUpdateAddress)}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
