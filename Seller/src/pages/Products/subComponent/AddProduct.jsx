import { motion } from "motion/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";

function AddProduct() {
  const { mode } = useSelector((state) => state.user);
  const [preview, setPreview] = useState([]);
  const [file, setFile] = useState([]);

  const addImage = (e) => {
    if (file.length == 5)
      return toast.error("Max 5 Image Allow", { position: "top-center" });
    setFile((prev) => [...prev, e.target.files[0]]);
    if (e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview((prev) => [...prev, url]);
    }
  };

  return (
    <motion.div
      className={`border p-2 rounded-lg max-h-[90vh] flex flex-col gap-2 ${mode ? "bg-mist-300 text-black" : "bg-gray-900"} overflow-y-auto`}
    >
      <span className={`text-blue-500 font-semibold tracking-[2px] text-center sticky top-0 ${mode ? "bg-mist-300 text-black" : "bg-gray-900"}`}>
        Add New Product
      </span>
      <div className=" h-fit flex flex-col gap-1 p-2 items-center justify-center rounded-xl">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center border w-full rounded-xl cursor-pointer active:bg-blue-700"
        >
          <CloudUploadIcon style={{ height: "50px", width: "50px" }} />
          Select Product Image
        </label>
        <input
          type="file"
          className="border-b hidden"
          id="file-upload"
          defaultValue={file}
          onChange={addImage}
        />
        <span className="text-xs text-gray-400">
          {file.length != 5 ? "Max 5 Image Allow" : "Max Image Reached"}
        </span>
        <div className="w-full flex flex-wrap gap-2 justify-center border-b border-b-gray-400">
          {preview?.map((img) => (
            <img src={img} alt="Preview" className="h-12" />
          ))}
        </div>
        <div className="w-full p-1 flex flex-col gap-1 ">
          <div className="flex w-full justify-between flex-wrap gap-2">
            <div
              className={`focus-within:border-b-3 border-b-2 w-full sm:w-[48%]  p-1 flex flex-col rounded-lg focus-within:border-blue-600`}
            >
              <label htmlFor="name">Product Name :</label>
              <input
                type="text"
                id="name"
                className="p-1 rounded-lg outline-none"
                placeholder="Enter Product Name"
              />
            </div>
            <div
              className={`w-full sm:w-[48%] items-center p-1 flex flex-wrap justify-between rounded-lg `}
            >
              <label htmlFor="category">Category :</label>
              <select name="category" id="category" className="border px-3 rounded-lg bg-gray-500 text-white">
                <option value="fashon">Fashon</option>
                <option value="mobile">Mobile</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
          </div>
          <div
            className={`focus-within:border-b-3 border-b-2  p-1 flex flex-col rounded-lg focus-within:border-blue-600`}
          >
            <label htmlFor="description">Description :</label>
            <textarea
              name="description"
              rows={4}
              id="description"
              className="p-1 rounded-lg outline-none"
              placeholder="Enter Product Description"
            ></textarea>
          </div>
          <div className="flex w-full justify-between flex-wrap">
            <div
              className={`focus-within:border-b-3 border-b-2 w-full sm:w-[30%] p-1 flex flex-col rounded-lg focus-within:border-blue-600`}
            >
              <label htmlFor="price">PRICE :</label>
              <input
                type="text"
                id="price"
                className="p-1 rounded-lg outline-none"
                placeholder="Enter Price"
              />
            </div>
            <div
              className={`focus-within:border-b-3 border-b-2 w-[49%] sm:w-[30%] p-1 flex flex-col rounded-lg focus-within:border-blue-600`}
            >
              <label htmlFor="stock">STOCK :</label>
              <input
                type="text"
                id="stock"
                className="p-1 rounded-lg outline-none"
                placeholder="Enter STcok"
              />
            </div>
            <div
              className={`focus-within:border-b-3 border-b-2 w-[49%] sm:w-[30%] p-1 flex flex-col rounded-lg focus-within:border-blue-600`}
            >
              <label htmlFor="discount">DISCOUNT : %</label>
              <input
                type="text"
                id="discount"
                className="p-1 rounded-lg outline-none"
                placeholder="Enter Disount"
              />
            </div>
          </div>

        </div>
        <button className="border w-full p-1 rounded-xl bg-blue-400 active:bg-blue-600">Add</button>
      </div>
    </motion.div>
  );
}

export default AddProduct;
