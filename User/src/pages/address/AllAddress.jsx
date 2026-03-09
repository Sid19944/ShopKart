import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";
import {
  addNewAddress,
  deleteAddress,
  getAddress,
  setSingleAddress,
} from "../../store/slice/address.slice";
import AddNewAdderss from "./AddNewAdderss";
import EditAddress from "./EditAddress";

function AllAddress() {
  const navigate = useNavigate();
  const dragConstraints = useRef(null);
  const dispatch = useDispatch();
  const { address, addErr, addMsg } = useSelector((state) => state.address);
  const [showAddTab, setShowAddTab] = useState(false);
  const [showEditTab, setShowEditTab] = useState(false);

  const handleDeleteAddress = (address_id) => {
    dispatch(deleteAddress(address_id));
  };

  const handleEditAddress = (address_id) => {
    const addres = address?.filter((addres) => addres._id == address_id);
    dispatch(setSingleAddress(addres[0]));
    setShowEditTab(!showEditTab);
  };

  useEffect(() => {
    dispatch(getAddress());
    addErr && toast.error(addErr);
    addMsg && toast.success(addMsg);
  }, [addErr, addMsg]);

  return (
    <div
      ref={dragConstraints}
      className="h-screen flex flex-col relaticve border"
    >
      <div className="flex text-white w-full justify-between items-center py-1 bg-blue-600 ">
        <span
          className="font-semibold tracking-[1px] px-2 text-2xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          ShopKart
        </span>
      </div>

      <div className="overflow-auto">
        <div className="flex justify-between p-1 flex-wrap">
          <h1 className="font-bold tracking-[1px] text-xl">Manage Address</h1>
          <button
            className="border w-60 rounded-lg bg-blue-400 text-white active:bg-blue-600 cursor-pointer"
            onClick={() => setShowAddTab(!showAddTab)}
          >
            Add New Address
          </button>
        </div>
        <div className="p-2 gap-2 flex flex-wrap ">
          {address?.map((addres, idx) => (
            <div
              key={idx}
              id="address"
              className="border rounded-lg flex flex-col w-full sm:w-fit p-2"
            >
              <span>{addres.fullname}</span>
              <span>{addres.number}</span>
              <span>{addres.addressLine}</span>
              <span>{addres.redion}</span>
              <span>{addres.pincode}</span>
              <span>{addres.state}</span>
              <span>{addres.district}</span>
              <span>{addres.country}</span>
              <div className="flex justify-between gap-1">
                <button
                  className="border rounded-lg w-1/2 active:bg-green-500 cursor-pointer"
                  onClick={() => handleEditAddress(addres._id)}
                >
                  Edit
                </button>
                <button
                  className="border rounded-lg w-1/2 active:bg-red-500 cursor-pointer"
                  onClick={() => handleDeleteAddress(addres._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {showAddTab && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              drag
              exit={{ scale: 0, opacity: 0 }}
              dragConstraints={dragConstraints}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-full sm:w-fit bg-white"
            >
              <AddNewAdderss remove={() => setShowAddTab(!showAddTab)} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showEditTab && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              drag
              exit={{ scale: 0, opacity: 0 }}
              dragConstraints={dragConstraints}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-full sm:w-fit bg-white"
            >
              <EditAddress remove={() => setShowEditTab(!showEditTab)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AllAddress;
