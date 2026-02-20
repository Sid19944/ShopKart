import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import toast from "react-hot-toast";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import GroupIcon from "@mui/icons-material/Group";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  approveProduct,
  blockProduct,
  setSingleProduct,
} from "../../store/slice/products.slice";
import ViewProductInfo from "./subComponect/ViewProductInfo";

import { motion } from "motion/react";

function Products() {
  const dispatch = useDispatch();
  const { products, loading, error, message } = useSelector(
    (state) => state.products,
  );

  const [showData, setShowData] = useState("allCategory");

  const today = new Date().setHours(0, 0, 0, 0);
  const sevenDayBefore =
    new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000;
  const thirtyDayBefore =
    new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000;

  const allDates = [];
  products.map((product) => {
    allDates.push(new Date(product.createdAt).setHours(0, 0, 0, 0));
  });

  let lastSevenDaysRegisters = allDates.filter(
    (date) => date >= sevenDayBefore,
  );
  let lastThirtyDaysRegisters = allDates.filter(
    (date) => date >= thirtyDayBefore,
  );

  const [showproduct, setShowproduct] = useState(false);
  const [showLoad, setShowLoad] = useState(null);

  const handleProductApprove = async (product_id) => {
    setShowLoad(product_id);
    await dispatch(approveProduct(product_id));
    setShowLoad(null);
  };

  const handleProductBlock = async (product_id) => {
    setShowLoad(product_id);
    await dispatch(blockProduct(product_id));
    setShowLoad(null);
  };

  const handleProductView = (product_id) => {
    setShowproduct(!showproduct);
    const product = products.filter((product) => product._id == product_id);
    dispatch(setSingleProduct(product[0]));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
    dispatch(getAllProducts());
  }, [error, message]);

  return (
    <div className="p-1 font-mono h-full flex flex-col">
      <div id="page info">
        <h1 className="text-3xl tracking-[2px]">
          PRODUCT INVENTORY MANAGEMENT
        </h1>
        <p className="text-xs text-gray-400">
          Oversee, Verify, and Manage products across the ShopCart
        </p>
      </div>

      <div id="top" className="grid grid-cols-3 gap-4 my-3 h-25">
        <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
          <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
            TOTAL PRODUCTS
            <span className="text-blue-600">
              <GroupIcon />
            </span>
          </label>
          <h1 className="text-3xl flex gap-3">
            <CountUp end={products.length} duration={2} />
            <span className="text-green-500 text-sm flex items-baseline gap-2">
              <QueryStatsIcon />
            </span>
          </h1>
        </div>
        <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
          <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
            LAST 7 DAYS{" "}
            <span className="text-blue-600">
              <GroupIcon />
            </span>
          </label>
          <h1 className="text-3xl flex gap-3">
            <CountUp end={lastSevenDaysRegisters.length} duration={2} />
            <span className="text-green-500 text-sm flex items-baseline gap-2">
              <QueryStatsIcon /> +
              {(lastSevenDaysRegisters.length * 100) / allDates.length}%
            </span>
          </h1>
        </div>

        <div className="border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px]">
          <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
            LAST 30 DAYS{" "}
            <span className="text-blue-600">
              <GroupIcon />
            </span>
          </label>
          <h1 className="text-3xl flex gap-3">
            <CountUp end={lastThirtyDaysRegisters.length} duration={2} />
            <span className="text-green-500 text-sm flex items-baseline gap-2">
              <QueryStatsIcon /> +
              {(lastThirtyDaysRegisters.length * 100) / allDates.length}%
            </span>
          </h1>
        </div>
      </div>

      <div
        id="viewing"
        className="border rounded-lg p-1 flex flex-col overflow-y-auto"
      >
        <div className="w-full rounded-lg p-2 my-1 flex gap-2">
          <input
            type="text"
            className="p-1 border w-full rounded-lg bg-gray-500"
            placeholder="Search Product"
          />
          <button className="border rounded-lg px-3 bg-blue-400 active:bg-blue-600 cursor-pointer">
            Search
          </button>
        </div>
        <nav className="flex gap-3 p-2 justify-between bg-gray-900 rounded-t-lg sticky-top top-0">
          <span
            className={`p-2 px-4 rounded-lg font-semibold text-blue-700 outline cursor-pointer`}
          >
            {/* {showData == "allSeller" ? sellers.length : blockSellers.length} */}
          </span>
          <div className="flex gap-2 text-sm">
            <div className="border p-1 px-2 rounded-lg bg-gray-700">
              <span>CATEGORY : </span>
              <select
                name="category"
                id="category"
                className="bg-gray-700 rounded-lg px-2 outline-none cursor-pointer"
              >
                <option value="allCategory">All Category</option>
                <option value="fashon">Fashon</option>
                <option value="mobile">Mobile</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
            <div className="border p-1 px-2 rounded-lg bg-gray-700 ">
              <span>STATUS : </span>
              <select
                name="stock"
                id="stock"
                className="bg-gray-700 rounded-lg px-2 outline-none cursor-pointer"
              >
                <option value="allStockLevels">All Stock Levels</option>
                <option value="inStock">In Stock</option>
                <option value="lowStock">Low Stock</option>
                <option value="outOFStock">Out Of Stock</option>
              </select>
            </div>
            <div className="border p-1 px-2 rounded-lg bg-gray-700">
              <span>VISIBALITY : </span>
              <select
                name="visivality"
                id="visivality"
                className="bg-gray-700 rounded-lg px-2 outline-none cursor-pointer"
              >
                <option value="active&draft">Active & Draft</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </nav>
        <div className="flex justify-around py-2 px-2 border-b border-gray-400">
          <span className="w-[30%] font-semibold text-xl tracking-[2px]">
            PRODUCT
          </span>
          <span className="w-[15%] font-semibold text-xl tracking-[2px]">
            CATEGORY
          </span>
          <span className="w-[15%] text-center font-semibold text-xl tracking-[2px]">
            PRICE
          </span>
          <span className="w-[15%] text-center font-semibold text-xl tracking-[2px]">
            STOCK
          </span>
          <span className="w-[15%] text-center font-semibold text-xl tracking-[2px]">
            VISIVALITY
          </span>
          <span className="w-[30%] text-center font-semibold text-xl tracking-[2px]">
            ACTIONS
          </span>
        </div>

        <div className="flex flex-col overflow-auto">
          {products.map((product, idx) => (
            <motion.li
              initial={{ x: -400, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: false }}
              key={idx}
              className={`flex justify-around border-gray-700 border-b p-1 gap-2 text-md items-center ${showproduct && "blur-[2px]"}`}
            >
              <div className="w-[30%] flex gap-2">
                <img src={product.image[0].url} className="h-13" />
                {product.name}
              </div>
              <span
                className={`w-[15%] text-center rounded-full bg-blue-500 ${product.category == "fashon" && "bg-green-600"}  ${product.category == "electronics" && "bg-yellow-700"}`}
              >
                {product.category}
              </span>
              <span className="w-[15%] text-center font-semibold">
                ₹{product.price}
              </span>
              <div
                className={`w-[15%] text-center flex flex-col items-start px-2 ${product.stock > 0 && product.stock <= 5 ? "text-orange-500" : product.stock == 0 ? "text-red-600" : "text-green-400"}`}
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
              <span className="w-[15%] text-center text-blue-500 font-semibold">
                {product.isApproved ? (
                  <div className="flex items-center gap-1">
                    <RemoveRedEyeIcon style={{ height: "20px" }} />
                    <span className="">Active</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-gray-500 font-semibold">
                    <VisibilityOffIcon style={{ height: "20px" }} />
                    <span className="">Draft</span>
                  </div>
                )}
              </span>

              <span className="w-[30%] text-center flex items-center justify-center gap-3">
                {!product.isApproved ? (
                  <button
                    disabled={loading}
                    className={`outline px-3 rounded-lg  text-blue-600 active:bg-blue-600 active:text-white ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={() => handleProductApprove(product._id)}
                  >
                    {showLoad == product._id ? (
                      <div className="flex w-20 justify-center">
                        <span className="border-2 h-5 w-5 flex border-t-black rounded-full animate-spin"></span>
                      </div>
                    ) : (
                      "Approved"
                    )}
                  </button>
                ) : (
                  <button
                    disabled={loading}
                    className={`outline px-3 rounded-lg  text-red-600 active:bg-red-600 active:text-white ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={() => handleProductBlock(product._id)}
                  >
                    {showLoad == product._id ? (
                      <div className="flex w-20 justify-center">
                        <span className="border-2 h-5 w-5 flex border-t-black rounded-full animate-spin"></span>
                      </div>
                    ) : (
                      "Block"
                    )}
                  </button>
                )}
                <button
                  className="text-green-500 cursor-pointer border px-2 rounded-lg flex items-center"
                  onClick={() => handleProductView(product._id)}
                >
                  <RemoveRedEyeIcon />
                </button>
              </span>
            </motion.li>
          ))}

          {showproduct && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <ViewProductInfo remove={() => setShowproduct(!showproduct)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
