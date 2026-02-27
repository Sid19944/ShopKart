import React, { useEffect, useRef, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
  getProductsByName,
  getSingleProduct,
  setSingleProduct,
} from "../../store/slice/product.slice";

import { motion } from "motion/react";
import ViewProduct from "./subComponent/ViewProduct";
import toast from "react-hot-toast";
import AddProduct from "./subComponent/AddProduct";
import EditPruduct from "./subComponent/EditPruduct";

function Products() {
  const dispatch = useDispatch();
  const constraintsRef = useRef(null);
  const { mode } = useSelector((state) => state.user);
  const { products, totalProduct, error, message } = useSelector(
    (state) => state.products,
  );
  const [page, setPage] = useState(1);
  const [showproduct, setShowproduct] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  const tPage = Math.ceil(totalProduct / 10);

  const handleViewProduct = (prod_id) => {
    setShowproduct(!showproduct);
    const product = products.filter((prod) => prod._id == prod_id);
    dispatch(setSingleProduct(product[0]));
  };

  const handleEditProduct = (prod_id) => {
    setEditProduct(!editProduct);
    const product = products.filter((prod) => prod._id == prod_id);
    dispatch(setSingleProduct(product[0]));
  };

  const handleProductDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handlePage = (selectedPage) => {
    selectedPage >= 1 && selectedPage <= tPage && setPage(selectedPage);
  };
  const [searchId, setSearchId] = useState("");
  const handleSearchId = () => {
    dispatch(getSingleProduct(searchId));
  };

  const [searchName, setSearchName] = useState("");
  const [debounce, setDebounce] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(searchName);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchName]);

  useEffect(() => {
    debounce.trim() && dispatch(getProductsByName(debounce));
  }, [debounce]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
    if (debounce.trim() == "" && searchId.trim() == "")
      dispatch(getProducts(page));
  }, [page, debounce, searchId, error, message]);

  return (
    <div
      className={`border-amber-300 flex flex-col h-full overflow-auto `}
      ref={constraintsRef}
    >
      <div
        id="info"
        className={`flex h-fit px-1 gap-1 pb-1 border-b border-b-gray-400 justify-between  items-center ${mode ? "bg-white text-black" : "bg-black text-white"}`}
      >
        <div className="flex flex-col">
          <span className="text-2xl font-semibold tracking-[1px]">
            Product Management
          </span>
          <span className="text-[9px] sm:text-xs text-gray-400">
            Moniter and Manage your Products acroos the ShopCart
          </span>
        </div>
        <button
          className="border bg-blue-500 active:bg-blue-700 px-3 h-fit py-1 rounded-lg absolute right-0 top-2 sm:relative sm:top-0 cursor-pointer"
          onClick={() => setAddProduct(!addProduct)}
        >
          Add New Product
        </button>
      </div>

      <div className="flex flex-1 flex-col sm:overflow-y-auto">
        <div className="sticky top-0">
          <div
            id="search"
            className={`flex gap-2 w-full h-fit p-2 ${mode ? "bg-white text-black" : "bg-black text-white"}`}
          >
            <div className="w-full relative">
              <input
                type="text"
                className={`border ${mode ? "bg-gray-400" : "bg-gray-500"} w-full px-1`}
                placeholder="Search Product By Name"
                value={searchName || ""}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <span
                className="absolute right-0 bg-gray-400"
                onClick={() => setSearchName("")}
              >
                <CloseIcon />
              </span>
            </div>
            <div className="w-full relative">
              <input
                type="text"
                className={`border ${mode ? "bg-gray-400" : "bg-gray-500"} w-full px-1 hidden sm:inline-block`}
                placeholder="Search Product By ID, Enter 24 digit ID"
                value={searchId || ""}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <span
                className="absolute right-0 bg-gray-400"
                onClick={() => setSearchId("")}
              >
                <CloseIcon />
              </span>
            </div>
            <button
              disabled={searchId.length != 24}
              className="border px-2 bg-blue-500 font-semibold rounded-lg active:bg-blue-700 cursor-pointer hidden sm:inline-block
              disabled:cursor-not-allowed disabled:bg-gray-400"
              onClick={handleSearchId}
            >
              Search
            </button>
          </div>
          <div
            className={`hidden sm:flex gap-1 font-semibold tracking-[1px] w-full h-fit justify-between p-2 border-b border-b-gray-500 text-center ${mode ? "bg-white text-black" : "bg-black text-white"}`}
          >
            <span className="w-[30%]">Product</span>
            <span className="w-[15%]">CATEGORY</span>
            <span className="w-[10%]">PRICE</span>
            <span className="w-[15%]">STOCK</span>
            <span className="w-[10%]">STATUS</span>
            <span className="w-[20%]">ACTION</span>
          </div>
        </div>

        <div id="list" className="flex flex-col gap-1">
          {products?.map((product, idx) => (
            <motion.li
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              key={product._id}
              className={`${(showproduct || addProduct) && "blur-[2px]"} h-50 sm:h-16 flex flex-col sm:flex-row gap-1 p-1 w-full sm:justify-between border-b border-b-gray-500 sm:text-center ${mode ? "bg-white text-black" : "bg-black text-white"}`}
            >
              <div className="flex h-3/4 sm:h-full justify-center sm:justify-start sm:items-center gap-1 sm:w-[30%] w-full">
                <span className="text-gray-500 hidden sm:inline-block">
                  {idx + 1}.
                </span>
                <img
                  src={product.image[0].url}
                  alt="Product"
                  className="h-full cursor-pointer"
                  onClick={() => handleViewProduct(product._id)}
                />
                <span className="hidden sm:inline-block">{product.name}</span>
              </div>
              <div className="sm:hidden flex gap-2 flex-col items-center h-fit font-semibold">
                <span>{product.name}</span>
              </div>

              <div className="hidden sm:flex w-[15%] items-center justify-center ">
                <span className="px-2 shadow-[0px_0px_3px_3px] shadow-blue-500 rounded-full bg-blue-400 text-sm">
                  {product.category}
                </span>
              </div>
              <div className="w-[10%] hidden sm:flex items-center justify-center font-semibold">
                <span>₹{product.price}</span>
              </div>
              <div
                className={`w-[15%] hidden sm:flex items-center justify-center flex-col text-sm ${product.stock > 0 && product.stock <= 5 ? "text-orange-500" : product.stock == 0 ? "text-red-600" : "text-green-400"}`}
              >
                <span>{product.stock}</span>
                {product.stock > 0 && product.stock <= 5 ? (
                  <span>Low Stock</span>
                ) : product.stock == 0 ? (
                  <span>Out Of Stock</span>
                ) : (
                  <span>In Stock</span>
                )}
              </div>
              <div
                className={`w-[10%] hidden sm:flex items-center justify-center text-sm gap-1 text-blue-600`}
              >
                <RemoveRedEyeIcon />
                <span>{product.isApproved ? "Active" : "Draft"}</span>
              </div>
              <div className="w-[20%] hidden sm:flex items-center justify-evenly">
                <RemoveRedEyeIcon
                  className="rounded-lg active:bg-blue-600 cursor-pointer"
                  style={{ height: "35px", width: "45px" }}
                  onClick={() => handleViewProduct(product._id)}
                />
                <BorderColorIcon
                  className="rounded-lg active:bg-green-600 cursor-pointer"
                  style={{ height: "35px", width: "45px" }}
                  onClick={() => handleEditProduct(product._id)}
                />
                <DeleteIcon
                  className="rounded-lg active:bg-red-600 cursor-pointer"
                  style={{ height: "35px", width: "45px" }}
                  onClick={() => handleProductDelete(product._id)}
                />
              </div>
            </motion.li>
          ))}

          {showproduct && (
            <motion.div
              drag
              dragConstraints={constraintsRef}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-full sm:w-fit "
            >
              <div className="overflow-y-auto">
                <ViewProduct
                  remove={() => setShowproduct(!showproduct)}
                  editProd={(prod_id) => handleEditProduct(prod_id)}
                  deleteProd={(prod_id) => handleProductDelete(prod_id)}
                />
              </div>
            </motion.div>
          )}
          {addProduct && (
            <motion.div
              drag
              dragConstraints={constraintsRef}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-full sm:w-fit `}
            >
              <div className="overflow-y-auto">
                <AddProduct remove={() => setAddProduct(!addProduct)} />
              </div>
            </motion.div>
          )}

          {editProduct && (
            <motion.div
              drag
              dragConstraints={constraintsRef}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-full sm:w-fit `}
            >
              <div className="overflow-auto">
                <EditPruduct remove={() => setEditProduct(!editProduct)} />
              </div>
            </motion.div>
          )}
        </div>

        {tPage > 0 && (
          <div className="sticky bottom-0">
            <div
              className={`h-fit py-1 items-center flex justify-center ${mode ? "bg-white text-black" : "bg-black text-white"}`}
            >
              <div className="max-w-[70%] overflow-x-auto p-2 flex gap-1">
                {page != 1 && (
                  <ArrowBackIosNewIcon
                    className="cursor-pointer border rounded-lg p-1 active:bg-blue-600 bg-blue-400"
                    style={{ height: "30px", width: "40px" }}
                    onClick={() => handlePage(page - 1)}
                  />
                )}

                {[...Array(tPage)].map((_, idx) => {
                  return (
                    <span
                      key={idx}
                      className={`border px-2 cursor-pointer ${page == idx + 1 && "bg-blue-600"} flex items-center`}
                      onClick={() => handlePage(idx + 1)}
                    >
                      {idx + 1}
                    </span>
                  );
                })}
                {page != tPage && (
                  <ArrowForwardIosIcon
                    className="cursor-pointer border rounded-lg p-1 active:bg-blue-600 bg-blue-400"
                    style={{ height: "30px", width: "40px" }}
                    onClick={() => handlePage(page + 1)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
