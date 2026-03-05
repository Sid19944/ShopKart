import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../store/slice/address.slice";
import { getUser } from "../../store/slice/user.slice";
import { getCart } from "../../store/slice/cart.slice";

function PlaceOrder() {
  const dispatch = useDispatch();
  const { address, addErr, addMsg } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.user);
  const [step, setStep] = useState(2);
  const [radioAddress, setRadioAddress] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  const handleSelectAddress = (address_id) => {
    setDeliveryAddress(address_id);
    setStep(3);
  };

  useEffect(() => {
    dispatch(getUser());
    dispatch(getCart());
    dispatch(getAddress());
  }, []);
  return (
    <div className="flex flex-col items-center gap-2">
      <nav className="font-semibold w-full bg-blue-500 p-2 text-white">
        ShopCart
      </nav>
      <div className="w-[80%] flex flex-col gap-2">
        <div
          id="user"
          className="border flex-col border-gray-400 flex p-2"
        >
          <div
            className={`flex gap-2 ${step == 1 ? "bg-blue-500" : "bg-white"} ${step > 1 && "text-gray-400"} p-2 font-semibold`}
          >
            <span className="h-fit px-2 bg-gray-200 text-blue-500">1</span>
            <h1 className="flex gap-2 items-center">
              LOGIN {step > 1 && <DoneIcon className="text-blue-500" />}
            </h1>
          </div>
          <span className="flex items-center gap-2 text-sm tracking-[1px] text-gray-500 px-5">
            {user.name}
          </span>
        </div>

        <div id="address" className="border border-gray-400 p-2">
          <div
            className={`flex gap-2 ${step == 2 ? "bg-blue-500" : "bg-white"} ${step > 2 && "text-gray-400"} p-2 font-semibold`}
          >
            <span className="h-fit px-2 bg-gray-200 text-blue-500">2</span>
            <h1 className="flex gap-2 items-center">
              DELIVERY ADDRESS{" "}
              {step > 2 && <DoneIcon className="text-blue-500" />}
            </h1>
          </div>
          <div className="p-2 flex flex-col gap-4">
            {deliveryAddress ? (
              <>
                {address
                  .filter((add) => add._id == deliveryAddress)
                  .map((add, idx) => (
                    <div key={idx} className="flex gap-2">
                      <h1 className="text-sm border p-3 rounded-lg w-[80%]">
                        <span className="font-semibold">
                          {add?.fullname},{add?.number}
                        </span>
                        , {add?.addressLine},{add?.region}, {add?.district},{" "}
                        {add?.state}, {add?.country}-{add?.pincode}
                      </h1>
                      <button
                        className="border w-[20%] h-fit py-1 rounded-lg text-blue-500 font-semibold cursor-pointer"
                        onClick={() => {
                          setDeliveryAddress(null);
                          setStep(2);
                        }}
                      >
                        CHANGE
                      </button>
                    </div>
                  ))}
              </>
            ) : (
              <>
                {address?.map((add, idx) => (
                  <label
                    key={idx}
                    htmlFor={idx}
                    className="flex gap-4 p-2 border rounded-lg"
                  >
                    <input
                      type="radio"
                      id={idx}
                      name="address"
                      value={add._id}
                      checked={add._id == radioAddress}
                      onChange={(e) => setRadioAddress(e.target.value)}
                    />
                    <div className="flex flex-col gap-2 cursor-pointer">
                      <h1 className="flex gap-3">
                        <span>{add?.fullname}</span>
                        <span>{add?.number}</span>
                      </h1>
                      <h1 className="text-sm ">
                        {add?.addressLine}, {add?.region}, {add?.district},{" "}
                        {add?.state}, {add?.country}-{add?.pincode}
                      </h1>
                      {add._id == radioAddress && (
                        <button
                          className="cursor-pointer bg-[rgb(251,100,27)] px-4 font-semibold tracking-[1px] text-white border w-fit p-2"
                          onClick={() => handleSelectAddress(add._id)}
                        >
                          DELIVER HERE
                        </button>
                      )}
                    </div>
                  </label>
                ))}
              </>
            )}
          </div>
        </div>

        <div id="order-summery" className="border border-gray-400 p-2">
          <div
            className={`flex gap-2 ${step == 3 ? "bg-blue-500" : "bg-white"} ${step > 3 && "text-gray-400"} p-2 font-semibold`}
          >
            <span className="h-fit px-2 bg-gray-200 text-blue-500">3</span>
            <h1>ORDER SUMMERY</h1>
          </div>

          <div>
            orders
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
