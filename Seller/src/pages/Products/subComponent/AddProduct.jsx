import { motion } from "motion/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";
import { Typewriter } from "react-simple-typewriter";

import CloseIcon from "@mui/icons-material/Close";
import { addNewProduct } from "../../../store/slice/product.slice";

function AddProduct({ remove }) {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.user);
  const { loading, message } = useSelector((state) => state.products);
  const [preview, setPreview] = useState([]);
  const [file, setFile] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "fashon",
    discount: 0,
  });

  if (message == "New Product added") {
    remove();
  }

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("stock", data.stock);
  formData.append("category", data.category);
  formData.append("discount", data.discount);
  file.map((img) => formData.append("image", img));

  const handleAddProduct = () => {
    dispatch(addNewProduct(formData));
  };

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
      <span
        className={`text-blue-500 font-semibold tracking-[2px] text-center sticky top-0 ${mode ? "bg-mist-300 text-black" : "bg-gray-900"}`}
      >
        Add New Product
      </span>
        <CloseIcon
          className={`absolute right-2 top-2 cursor-pointer active:text-blue-600 `}
          onClick={() => remove()}
        />
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
          disabled={loading}
          defaultValue={file}
          onChange={addImage}
        />
        <span className="text-xs text-gray-400">
          {file.length != 5 ? "Max 5 Image Allow" : "Max Image Reached"}
        </span>
        <div className="w-full flex flex-wrap gap-2 justify-center border-b border-b-gray-400">
          {preview?.map((img, idx) => (
            <img key={idx} src={img} alt="Preview" className="h-12" />
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
                name="name"
                disabled={loading}
                defaultValue={data.name}
                onChange={handleData}
                className="p-1 rounded-lg outline-none"
                placeholder="Enter Product Name"
              />
            </div>
            <div
              className={`w-full sm:w-[48%] items-center p-1 flex flex-wrap justify-between rounded-lg `}
            >
              <label htmlFor="category">Category :</label>
              <select
                name="category"
                value={data.category}
                onChange={handleData}
                id="category"
                className="border px-3 rounded-lg bg-gray-500 text-white"
              >
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
              disabled={loading}
              defaultValue={data.description}
              onChange={handleData}
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
                type="number"
                id="price"
                name="price"
                disabled={loading}
                defaultValue={data.price}
                onChange={handleData}
                className="p-1 rounded-lg outline-none"
                placeholder="Enter Price"
              />
            </div>
            <div
              className={`focus-within:border-b-3 border-b-2 w-[49%] sm:w-[30%] p-1 flex flex-col rounded-lg focus-within:border-blue-600`}
            >
              <label htmlFor="stock">STOCK :</label>
              <input
                type="number"
                id="stock"
                name="stock"
                disabled={loading}
                defaultValue={data.stock}
                onChange={handleData}
                className="p-1 rounded-lg outline-none"
                placeholder="Enter STcok"
              />
            </div>
            <div
              className={`focus-within:border-b-3 border-b-2 w-[49%] sm:w-[30%] p-1 flex flex-col rounded-lg focus-within:border-blue-600`}
            >
              <label htmlFor="discount">DISCOUNT : %</label>
              <input
                disabled={loading}
                type="number"
                id="discount"
                name="discount"
                defaultValue={data.discount}
                onChange={handleData}
                className="p-1 rounded-lg outline-none"
                placeholder="Enter Disount"
              />
            </div>
          </div>
        </div>
        <button
          disabled={loading}
          className="border w-full p-1 rounded-xl bg-blue-400 active:bg-blue-600 flex items-center justify-center cursor-pointer"
          onClick={handleAddProduct}
        >
          {loading ? (
            <span className="flex items-center gap-1">
              <span className="h-6 w-6 border-3 border-t-blue-400 animate-spin inline-block rounded-full"></span>
              <Typewriter
                words={["Adding..."]}
                loop={100}
                typeSpeed={70}
                deleteSpeed={70}
              />
            </span>
          ) : (
            "Add Product"
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default AddProduct;
