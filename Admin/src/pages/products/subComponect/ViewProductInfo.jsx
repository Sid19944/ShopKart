import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

function ViewProductInfo({remove}) {
  const { product } = useSelector((state) => state.products);
  const {sellers} = useSelector((state)=>state.sellers)
  const seller = sellers.filter((seller)=>seller._id == product.seller)
  console.log(seller)
  return (
    <div className="border bg-gray-900 p-2 rounded-lg flex flex-col gap-2 min-w-100">
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
        <div className="flex flex-col p-1 gap-2 w-full">
          <div className="flex w-full gap-2 border-b border-gray-500">
            <label>STORE :</label>
            <h1>{}</h1>
          </div>
          <div className="flex w-full gap-2 border-b border-gray-500">
            <label>NAME :</label>
            <h1>{product.name}</h1>
          </div>
          <div className="flex w-full gap-2 border-b border-gray-500">
            <label>PRICE :</label>
            <h1>{product.price}</h1>
          </div>
          <div className="flex w-full gap-2 border-b border-gray-500">
            <label>STOCK :</label>
            <h1>{product.stock}</h1>
          </div>

          
        </div>
      </div>

      <div id="store" className="border rounded-lg flex p-1 flex-col">
        <div className="flex w-full gap-2 border-b border-gray-500">
            <label>Rating :</label>
            <h1>4</h1>
          </div>
        <div className="flex w-full flex-wrap gap-2 border-b border-gray-500">
          <label>DESCRIPTION :</label>
          <h1>{product.description}</h1>
        </div>
      </div>
    </div>
  );
}

export default ViewProductInfo;
