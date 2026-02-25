import React, { useState } from "react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MovieEditIcon from "@mui/icons-material/MovieEdit";
import {
  addMoreProductImage,
  deleteProductImage,
  updateProduct,
} from "../../../store/slice/product.slice";
import { Typewriter } from "react-simple-typewriter";
import toast from "react-hot-toast";

function EditPruduct({ remove }) {
  const { product, loading, message } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.user);
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState([]);
  const [updateImage, setUpdateImage] = useState(false);
  const [data, setData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    discount: product?.discount,
  });

  const formData = new FormData();
  file.map((img) => formData.append("image", img));

  if (message == "Product updated") {
    setTimeout(() => {
      remove();
    }, 300);
  }
  if (message == "Image deleted") {
    setTimeout(() => {
      remove();
    }, 300);
  }
  if (message == "Image added") {
    setTimeout(() => {
      remove();
    }, 300);
  }

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSumbit = (prod_id) => {
    dispatch(updateProduct(prod_id, data));
  };
  const deleteImage = (imgId) => {
    product.image.length > 1 &&
      dispatch(deleteProductImage(product._id, imgId));
  };

  const addImg = (e) => {
    if (file.length + product.image.length == 5) {
      throw toast.error("Max Image reached press submit");
    }
    setFile((prev) => [...prev, e.target.files[0]]);
    if (e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview((prev) => [...prev, url]);
    }
  };

  const handleImgSumbit = (prod_id) => {
    dispatch(addMoreProductImage(prod_id, formData));
  };

  return (
    <motion.div
      className={`border p-2 rounded-lg max-h-[90vh] flex flex-col gap-2 ${mode ? "bg-mist-300 text-black" : "bg-gray-900"} overflow-y-auto`}
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

        <span className="text-xs text-gray-500 w-75">
          ID :{" "}
          <input
            type="text"
            disabled
            className="w-60"
            defaultValue={product._id}
          />
        </span>
      </div>

      <div id="product" className="rounded-lg flex h-fit">
        <div className="flex flex-wrap flex-col p-1 gap-2 w-full">
          {updateImage ? (
            <span
              className="border p-2 rounded-lg tracking-[1px] cursor-pointer active:bg-blue-700 bg-blue-500"
              onClick={() => setUpdateImage(!updateImage)}
            >
              <MovieEditIcon /> Update Data
            </span>
          ) : (
            <span
              className="border p-2 rounded-lg tracking-[1px] cursor-pointer active:bg-blue-700 bg-blue-500"
              onClick={() => setUpdateImage(!updateImage)}
            >
              <MovieEditIcon /> Update Images
            </span>
          )}

          {updateImage ? (
            <>
              {product.image.length != 5 && (
                <div>
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center border w-full rounded-xl cursor-pointer active:bg-blue-700"
                  >
                    <CloudUploadIcon
                      style={{ height: "50px", width: "50px" }}
                    />
                    Select Product Image
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    disabled={loading}
                    defaultValue={file}
                    onChange={addImg}
                  />
                  <div className="my-2 border-b border-gray-400">
                    {preview?.map((img, idx) => (
                      <img key={idx} src={img} className="h-15" />
                    ))}
                  </div>
                </div>
              )}
              {product.image.length >= 1 && (
                <span className="text-center">Click Image to delete</span>
              )}

              <div className="flex gap-2 px-5 overflow-x-auto">
                {product.image.map((img, idx) => (
                  <img
                    src={img.url}
                    key={idx}
                    alt="image"
                    className={`h-30 opacity-80 border cursor-pointer`}
                    onClick={() => deleteImage(img._id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap flex-col p-1 gap-2 w-full">
                <div className="flex w-full gap-2 border-b border-gray-500">
                  <label>STORE :</label>
                  <input type="text" defaultValue={product.seller.storeName} />
                </div>
                <div className="flex flex-wrap w-full gap-2">
                  <label>NAME :</label>
                  <input
                    type="text"
                    name="name"
                    className="border px-1 rounded-lg w-full"
                    defaultValue={data.name}
                    onChange={handleData}
                  />
                </div>
                <div className="flex flex-wrap w-full gap-2">
                  <label>PRICE : ₹</label>
                  <input
                    type="number"
                    name="price"
                    className="border px-1 rounded-lg w-full"
                    defaultValue={data.price}
                    onChange={handleData}
                  />
                </div>
                <div className="flex flex-wrap w-full gap-2">
                  <label>AVL STOCK :</label>
                  <input
                    type="number"
                    name="stock"
                    className="border px-1 rounded-lg w-full"
                    onChange={handleData}
                    defaultValue={data.stock}
                  />
                </div>
                <div className="flex flex-wrap w-full gap-2">
                  <label>Discount : %</label>
                  <input
                    type="number"
                    name="discount"
                    className="border px-1 rounded-lg w-full"
                    onChange={handleData}
                    defaultValue={data.discount}
                  />
                </div>
                <div className="flex w-full flex-col flex-wrap gap-2">
                  <label>DESCRIPTION :</label>
                  <textarea
                    rows={4}
                    name="description"
                    defaultValue={data.description}
                    onChange={handleData}
                    className="border p-1 rounded-lg"
                  />
                </div>
              </div>
            </>
          )}
          {updateImage ? (
            <button
              disabled={loading || file.length < 1}
              className="border w-full p-1 rounded-xl bg-blue-400 active:bg-blue-600 flex items-center justify-center cursor-pointer"
              onClick={() => handleImgSumbit(product._id)}
            >
              {loading ? (
                <span className="flex items-center gap-1">
                  <span className="h-6 w-6 border-3 border-t-blue-400 animate-spin inline-block rounded-full"></span>
                  <Typewriter
                    words={[
                      file.length && loading ? "Adding...." : "Deleting...",
                    ]}
                    loop={100}
                    typeSpeed={70}
                    deleteSpeed={70}
                  />
                </span>
              ) : (
                "Add New Image"
              )}
            </button>
          ) : (
            <button
              disabled={loading}
              className="border w-full p-1 rounded-xl bg-blue-400 active:bg-blue-600 flex items-center justify-center cursor-pointer"
              onClick={() => handleSumbit(product._id)}
            >
              {loading ? (
                <span className="flex items-center gap-1">
                  <span className="h-6 w-6 border-3 border-t-blue-400 animate-spin inline-block rounded-full"></span>
                  <Typewriter
                    words={["Deleting...."]}
                    loop={100}
                    typeSpeed={70}
                    deleteSpeed={70}
                  />
                </span>
              ) : (
                "Update Product"
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default EditPruduct;
