import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useDispatch, useSelector } from "react-redux";

function AllProducts() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [showproduct, setShowproduct] = useState(false);

  return (
    <>
      {products.map((product, idx) => (
        <li
          key={idx}
          className={`flex justify-around border-gray-700 border-b p-1 gap-2 text-md items-center ${showproduct && "blur-[2px]"}`}
        >
          <div className="w-[30%] flex gap-2">
            <img src={product.image[0].url} className="h-13" />
            {product.name}
          </div>
          <span
            className={`w-[10%] text-center rounded-full bg-blue-500 ${product.category == "fashon" && "bg-green-600"}  ${product.category == "electronics" && "bg-yellow-700"}`}
          >
            {product.category}
          </span>
          <span className="w-[10%] text-center font-semibold">
            ₹{product.price}
          </span>
          <div
            className={`w-[10%] text-center flex flex-col items-start px-2 ${product.stock > 0 && product.stock <= 5 ? "text-orange-500" : product.stock == 0 ? "text-red-600" : "text-green-400"}`}
          >
            {product.stock > 0 && product.stock <= 5 ? (
              <span>Low Stock</span>
            ) : product.stock == 0 ? (
              <span>Out Of Stock</span>
            ) : (
              <span>In Stock</span>
            )}

            {product.stock != 0 && <span>({product.stock})</span>}
          </div>
          <span className="w-[10%] text-center">
            {product.isApproved ? (
              <div className="flex items-center gap-1">
                <CheckCircleIcon
                  className="text-green-500"
                  style={{ height: "15px" }}
                />{" "}
                <span>Approved</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <CancelIcon
                  className="text-red-500"
                  style={{ height: "15px" }}
                />{" "}
                <span>Block</span>
              </div>
            )}
          </span>

          <span className="w-[30%] text-center">{product.stock}</span>
          {/* <span className="text-xl flex gap-2 w-[30%] justify-center">
            <button
              className={`outline px-3 rounded-lg cursor-pointer active:bg-blue-600 ${product.isApproved ? "bg-blue-400" : "text-blue-600"}`}
              onClick={() => handleproductApprove(product._id)}
            >
              Approved
            </button>
            <button
              className={`outline px-3 rounded-lg cursor-pointer ${!product.isApproved ? "bg-red-600" : "text-red-600"}`}
              onClick={() => handleproductBlock(product._id)}
            >
              Block
            </button>
            <button
              className="text-green-500 cursor-pointer border px-2 rounded-lg flex items-center"
              onClick={() => handleViewproduct(product._id)}
            >
              <RemoveRedEyeIcon />
            </button>
          </span> */}
        </li>
      ))}

      {showproduct && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ViewproductInfo remove={() => setShowproduct(!showproduct)} />
        </div>
      )}
    </>
  );
}

export default AllProducts;
