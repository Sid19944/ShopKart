import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { addNewAddress } from "../../../store/slice/address.slice";

import toast from "react-hot-toast";

function AddNewAddress({ remove }) {
  const dispatch = useDispatch();
  const { addres } = useSelector((state) => state.address);

  const [addressData, setAddressData] = useState({
    fullname: "",
    addressLine: "",
    pincode: null,
    region: "",
    country: "",
    state: "",
    district: "",
  });

  if (addressData.pincode?.length > 6) {
    toast.error("Please Enter 6 Digit", { position: "top-center" });
  }

  const handleData = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (addressData.pincode?.length == 6) {
      (async () => {
        await axios
          .get(`https://api.postalpincode.in/pincode/${addressData.pincode}`)
          .then((res) => {
            const address = res.data[0].PostOffice[0];
            setAddressData({
              ...addressData,
              ["region"]: address.Name,
              ["country"]: address.Country,
              ["state"]: address.State,
              ["district"]: address.District,
            });
          })
          .catch((err) => {
            toast.error("Invalid PINCODE", { position: "top-center" });
          });
      })();
    }
  }, [addressData.pincode]);

  const handleAddAddress = (e) => {
    e.preventDefault();
    dispatch(addNewAddress(addressData));
    remove();
  };

  return (
    <div className={`border p-2 rounded-lg flex flex-col bg-gray-900`}>
      <div className="flex justify-between">
        <span className="text-xl font-semibold text-blue-500 w-full text-center">
          ADD NEW ADDRESS
        </span>
        <CloseIcon
          className="cursor-pointer active:text-blue-600"
          onClick={() => remove()}
        />
      </div>
      <form className="flex flex-col ">
        <div className={`p-1 gap-1 w-full`}>
          <label className={`text-md`} htmlFor="fullname">
            FullName
          </label>
          <input
            id="fullname"
            name="fullname"
            className={`border w-full rounded-lg p-1 `}
            type="text"
            value={addressData.fullname || ""}
            onChange={handleData}
          />
        </div>
        <div className={`p-1 gap-1 w-full`}>
          <label className={`text-md`} htmlFor="district">
            Number
          </label>
          <input
            id="number"
            name="number"
            className={`border w-full rounded-lg p-1`}
            type="number"
            value={addressData.number || ""}
            onChange={handleData}
          />
        </div>
        <div className={`p-1 gap-1 w-full`}>
          <label className={`text-md`} htmlFor="addressLine">
            AddressLine
          </label>
          <input
            id="addressLine"
            name="addressLine"
            className={`border w-full rounded-lg p-1 `}
            type="text"
            value={addressData.addressLine || ""}
            onChange={handleData}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <div className={`p-1 gap-1 w-full`}>
              <label className={`text-md`} htmlFor="pincode">
                Pincode
              </label>
              <input
                id="pincode"
                name="pincode"
                className={`border w-full rounded-lg p-1 `}
                type="number"
                value={addressData.pincode || ""}
                onChange={handleData}
              />
            </div>
            <div className={`p-1 gap-1 w-full`}>
              <label className={`text-md`} htmlFor="region">
                Region
              </label>
              <input
                id="region"
                name="region"
                className={`border w-full rounded-lg p-1`}
                type="text"
                value={addressData.region || ""}
                onChange={handleData}
              />
            </div>
          </div>
          <div className="flex">
            <div className={`p-1 gap-1 w-full`}>
              <label className={`text-md`} htmlFor="country">
                Country
              </label>
              <input
                disabled
                id="country"
                name="country"
                className={`border w-full rounded-lg p-1 disabled:cursor-not-allowed`}
                type="text"
                value={addressData.country || ""}
              />
            </div>
            <div className={`p-1 gap-1 w-full`}>
              <label className={`text-md`} htmlFor="state">
                State
              </label>
              <input
                id="state"
                disabled
                name="state"
                className={`border w-full rounded-lg p-1 disabled:cursor-not-allowed`}
                type="text"
                value={addressData.state || ""}
                onChange={handleData}
              />
            </div>
          </div>
        </div>

        <div className={`p-1 gap-1 w-full`}>
          <label className={`text-md`} htmlFor="district">
            District
          </label>
          <input
            id="district"
            disabled
            name="district"
            className={`border w-full rounded-lg p-1 disabled:cursor-not-allowed`}
            type="text"
            value={addressData.district || ""}
            onChange={handleData}
          />
        </div>
        <button
          className="border p-1 rounded-lg bg-blue-400 cursor-pointer"
          onClick={handleAddAddress}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNewAddress;
