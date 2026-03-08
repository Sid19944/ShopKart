import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../store/slice/address.slice";
import { getUser } from "../../store/slice/user.slice";
import { getCart } from "../../store/slice/cart.slice";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address, addErr, addMsg } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
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
    <div className="flex flex-col items-center gap-2 h-screen">
      <nav className="font-semibold w-full bg-blue-500 p-2 text-white sticky top-0">
        ShopCart
      </nav>
      <div className="w-[90%] flex-1 flex flex-wrap gap-2 overflow-auto">
        <div className="w-full sm:w-[68%] flex flex-col gap-2 ">
          <div id="user" className="border flex-col border-gray-400 flex p-2">
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
              className={`flex justify-between ${step == 2 ? "bg-blue-500" : "bg-white"} ${step > 2 && "text-gray-400"} p-2 font-semibold`}
            >
              <div className="flex items-center gap-2">
                <span className="h-fit px-2 bg-gray-200 text-blue-500">2</span>
                <h1 className="flex gap-2 items-center">
                  {deliveryAddress ? "DELIVERED TO" : "DELIVERY ADDRESS"}
                  {step > 2 && <DoneIcon className="text-blue-500" />}
                </h1>
              </div>
              <button
                className="border px-1 h-fit py-1 rounded-lg text-blue-500 font-semibold cursor-pointer"
                onClick={() => {
                  setDeliveryAddress(null);
                  setStep(2);
                }}
              >
                CHANGE
              </button>
            </div>
            <div className="p-2 flex flex-col gap-2">
              {deliveryAddress ? (
                <>
                  {address
                    .filter((add) => add._id == deliveryAddress)
                    .map((add, idx) => (
                      <div key={idx} className="flex gap-2">
                        <h1 className="text-sm border p-3 rounded-lg ">
                          <span className="font-semibold">
                            {add?.fullname},{add?.number}
                          </span>
                          , {add?.addressLine},{add?.region}, {add?.district},{" "}
                          {add?.state}, {add?.country}-{add?.pincode}
                        </h1>
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

            {step == 3 && (
              <div>
                {cart?.items?.map((item, idx) => (
                  <div key={idx} className="border-b p-2 flex gap-2">
                    <div className="flex flex-col justify-between items-center">
                      <img
                        src={item.product_id.image[0].url}
                        alt="product"
                        className="w-20"
                      />
                      <h1 className="font-semibold text-sm">
                        QTY : {item.quentity}
                      </h1>
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <h1 className="sm:text-xl font-semibold tracking-[1px] tex-sm">
                        {item.product_id.name}
                      </h1>
                      <h1 className="text-sm">{item.product_id.category}</h1>
                      <h1 className="text-sm text-gray-400">
                        Seller : {item.product_id.seller.storeName}
                      </h1>
                      <h1 className="text-xl font-semibold">
                        ₹{item.product_id.price * item.quentity}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          id="price"
          className="w-full h-fit sm:w-[30%] bg-white sm:sticky sm:top-0"
        >
          <div className="border border-gray-400 h-fit p-1 flex gap-3 flex-col">
            <h1 className="font-semibold ">Price details</h1>
            <div className="border rounded-lg p-1 bg-gray-200 flex flex-col gap-4">
              <div className="border-b flex justify-between border-dashed">
                <span>MRP</span> <span>₹{cart.total_price}</span>
              </div>
              <div className="border-b flex justify-between border-dashed">
                <span>Placeform Fee</span> <span>FREE</span>
              </div>
              <div className="text-xl font-semibold flex justify-between">
                <span>Total Amount</span> <span>₹{cart.total_price}</span>
              </div>
            </div>
          </div>
        </div>

        {step == 3 && (
          <div className="flex w-full sm:w-[70%] mt-auto justify-between items-center p-2 sticky bottom-0 bg-white">
            <span className="font-semibold text-2xl">₹{cart.total_price}</span>
            <button
              className="border cursor-pointer w-40 sm:w-70 py-2 bg-yellow-400 font-semibold active:bg-yellow-600"
              onClick={() =>
                navigate("/order-processing", {
                  state: { shippingAddress_id: deliveryAddress },
                })
              }
            >
              PLACE ORDER
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaceOrder;
