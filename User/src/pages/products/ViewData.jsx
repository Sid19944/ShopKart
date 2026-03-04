import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleProduct } from "../../store/slice/product.slice";
import { useNavigate } from "react-router-dom";

function ViewData({ category }) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { mode, user, isAuthenticated } = useSelector((state) => state.user);

  const fashon = products.filter((prod) => prod.category == "fashon");
  const electronics = products.filter((prod) => prod.category == "electronics");
  const mobile = products.filter((prod) => prod.category == "mobile");

  const navigate = useNavigate()
  const handleSetSingleProduct = (prod_id) => {
    navigate(`/view/${prod_id}`)
  };

  return (
    <>
      {(category == "" || category == "fashon") && fashon.length > 0 && (
        <div
          className={`border rounded-lg p-2 ${mode ? "bg-amber-300" : "bg-gray-800"} `}
        >
          <h1
            className={`w-full ${mode ? "bg-gray-400 text-black" : "bg-gray-900 text-white"} rounded-lg px-2 mb-1 text-lg tracking-[1px]`}
          >
            Fashon
          </h1>
          <div className="grid md:grid-cols-4 grid-cols-3 h-fit gap-2">
            {fashon.map((prod, idx) => (
              <div
                id="prod-card"
                key={idx}
                onClick={() => handleSetSingleProduct(prod._id)}
                className={`rounded-lg flex flex-col ${mode ? "bg-white text-black" : "bg-gray-900 text-white"} p-2 cursor-pointer`}
              >
                <img
                  src={prod?.image[0]?.url}
                  alt="product"
                  className="rounded-lg border h-fit"
                />
                <div>
                  <h1 className="text-sm h-5 overflow-hidden">{prod.name}</h1>
                  <h1 className="text-sm font-semibold">₹{prod.price}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(category == "" || category == "electronics") &&
        electronics.length > 0 && (
          <div
            className={`border rounded-lg p-2 ${mode ? "bg-red-500" : "bg-gray-800"}`}
          >
            <h1
              className={`w-full ${mode ? "bg-gray-400 text-black" : "bg-gray-900 text-white"} rounded-lg px-2 mb-1 text-lg tracking-[1px]`}
            >
              Electronics
            </h1>
            <div className="grid md:grid-cols-4 grid-cols-3 h-fit gap-2">
              {electronics.map((prod, idx) => (
                <div
                  id="prod-card"
                  key={idx}
                  onClick={() => handleSetSingleProduct(prod._id)}
                  className={`rounded-lg flex flex-col ${mode ? "bg-white text-black" : "bg-gray-900 text-white"} p-2 cursor-pointer`}
                >
                  <img
                    src={prod?.image[0]?.url}
                    alt="product"
                    className="rounded-lg border h-full"
                  />

                  <div>
                    <h1 className="text-sm h-5 overflow-hidden">{prod.name}</h1>
                    <h1 className="text-sm font-semibold">₹{prod.price}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {(category == "" || category == "mobile") && mobile.length > 0 && (
        <div
          className={`border rounded-lg p-2 ${mode ? "bg-purple-500" : "bg-gray-800"}`}
        >
          <h1
            className={`w-full ${mode ? "bg-gray-400 text-black" : "bg-gray-900 text-white"} rounded-lg px-2 mb-1 text-lg tracking-[1px]`}
          >
            Mobils
          </h1>
          <div className="grid md:grid-cols-4 grid-cols-3 h-fit gap-2">
            {mobile.map((prod, idx) => (
              <div
                id="prod-card"
                key={idx}
                onClick={() => handleSetSingleProduct(prod._id)}
                className={`rounded-lg flex flex-col ${mode ? "bg-white text-black" : "bg-gray-900 text-white"} p-2 cursor-pointer`}
              >
                <img
                  src={prod?.image[0]?.url}
                  alt="product"
                  className="rounded-lg border h-fit"
                />
                <div>
                  <h1 className="text-sm h-5 overflow-hidden">{prod.name}</h1>
                  <h1 className="text-sm font-semibold">₹{prod.price}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ViewData;
