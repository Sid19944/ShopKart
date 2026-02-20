import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

import Rating from "@mui/material/Rating";
import { motion } from "motion/react";

function ViewProductInfo({ remove }) {
  const { product } = useSelector((state) => state.products);
  let totalRating = 0;
  product?.reviews?.map((rev) => (totalRating += rev.rating));
  return (
    <motion.div
      className="border bg-gray-900 p-2 rounded-lg flex flex-col gap-2 min-w-100"
    >
      <div className="flex justify-between text-lg tracking-[2px]">
        <span> PRODUCT'S DETAILS</span>
        <CloseIcon onClick={() => remove()} className="cursor-pointer" />
      </div>

      <div id="product" className="border rounded-lg flex">
        <img
          src={product.image[0].url}
          alt="avatar"
          className="h-32 rounded-l-lg"
        />
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
            <h1>{product.price}</h1>
          </div>
          <div className="flex flex-wrap w-full gap-2 border-b border-gray-500">
            <label>AVL STOCK :</label>
            <h1>{product.stock}</h1>
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
    </motion.div>
  );
}

export default ViewProductInfo;
