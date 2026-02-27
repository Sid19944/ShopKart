import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

import Rating from "@mui/material/Rating";
import { motion } from "motion/react";

function ViewProduct({ remove, editProd, deleteProd }) {
  const { product } = useSelector((state) => state.products);
  const { mode } = useSelector((state) => state.user);
  let totalRating = 0;
  product?.reviews?.map((rev) => (totalRating += rev.rating));

  const [selectedImage, setSelectedImage] = useState(product.image[0].url);

  return (
    <motion.div
      className={`border p-2 rounded-lg max-h-[90vh] overflow-y-auto flex flex-col gap-2 ${mode ? "bg-mist-300 text-black" : "bg-gray-900"} `}
    >
      <div className="flex flex-col text-lg tracking-[2px]">
        <div className="flex justify-between ">
          <span className="tracking-[2px] text-blue-700 font-semibold">
            PRODUCT'S DETAILS
          </span>
          <CloseIcon
            onClick={() => remove()}
            className="cursor-pointer active:text-blue-600"
          />
        </div>


        <span className="text-xs text-gray-500 min-w-75">ID : <input type="text" className="min-w-70" defaultValue={product._id} /></span>
      </div>

      <div id="product" className="border rounded-lg flex">
        <div className="flex flex-wrap flex-col p-1 gap-2 w-full">
          <div className="w-full justify-center flex border-b border-gray-500">
            <img
              src={selectedImage}
              alt="avatar"
              className="h-25 rounded-lg "
            />
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto">
            {product.image.map((img, idx) => (
              <img
                src={img.url}
                key={idx}
                alt="image"
                className={`h-14 opacity-80 border ${selectedImage != img.url && "blur-[0.5px]"} cursor-pointer`}
                onClick={() => setSelectedImage(img.url)}
              />
            ))}
          </div>

          <div className="flex flex-wrap flex-col p-1 gap-2 w-full">
            <div className="flex w-full gap-2 border-b border-gray-500">
              <label>STORE :</label>
              <h1>{product.seller.storeName}</h1>
            </div>
            <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
              <label>NAME :</label>
              <h1>{product.name}</h1>
            </div>
            <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
              <label>PRICE :</label>
              <h1>₹{product.price}</h1>
            </div>
            <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
              <label>AVL STOCK :</label>
              <h1 className="font-semibold">{product.stock}</h1>
            </div>
          </div>
        </div>
      </div>

      <div id="store" className="border rounded-lg flex p-1 flex-col">
        <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
          <label>AVG RATING :</label>
          <Rating value={totalRating / product?.reviews?.length} />(
          {product?.reviews?.length})
        </div>
        <div className="flex w-full flex-wrap gap-2 border-b border-gray-500">
          <label>DESCRIPTION :</label>
          <h1>{product.description}</h1>
        </div>
      </div>
      <div className="flex justify-around py-2">
        <button
          className="border px-3 rounded-lg bg-orange-400 active:bg-orange-600 cursor-pointer"
          onClick={() => editProd(product._id)}
        >
          Edit
        </button>
        <button
          className="border px-3 rounded-lg bg-red-500 active:bg-red-700 cursor-pointer"
          onClick={() => {
            deleteProd(product._id);
            remove();
          }}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}

export default ViewProduct;
