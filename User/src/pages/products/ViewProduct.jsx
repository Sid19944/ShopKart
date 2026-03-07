import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getSingleProductById } from "../../store/slice/product.slice";
import toast from "react-hot-toast";

import Rating from "@mui/material/Rating";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart, getCart } from "../../store/slice/cart.slice";

function ViewProduct() {
  const { prod_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, error, message } = useSelector((state) => state.products);

  const { cart, cartErr, cartMsg } = useSelector((state) => state.cart);
  const checkInCart = cart?.items?.filter(
    (item) => item.product_id._id == prod_id,
  )[0];

  const hanldeAddToCart = (prod_id, qty) => {
    dispatch(addToCart({ product_id: prod_id, quentity: qty }));
  };

  const handleBuyProduct = (prod_id, qty) => {
    dispatch(addToCart({ product_id: prod_id, quentity: qty }));
    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  };

  useEffect(() => {
    dispatch(getCart());
  }, [cartErr, cartMsg]);

  const totalRating = product?.reviews?.reduce((acc, curr) => {
    return acc + curr.rating;
  }, 0);

  useEffect(() => {
    dispatch(getSingleProductById(prod_id));
  }, []);
  useEffect(() => {
    cartErr && toast.error(cartErr);
    cartMsg && toast.success(cartMsg);
    error && toast.error("Someting went wrong", { position: "top-center" });
  }, [error, message, cartErr, cartMsg]);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-1 w-full justify-center items-center">
        <div className="flex border px-2 py-1 items-center bg-blue-600 justify-between w-full">
          <div className="flex text-white w-full justify-between items-center px-5">
            <span
              className="font-semibold tracking-[1px] px-5 cursor-pointer"
              onClick={() => navigate("/")}
            >
              ShopCart
            </span>
            <Link
              id="cart"
              to={"/cart"}
              className="flex px-3 py-1 group cursor-pointer"
            >
              <ShoppingCartIcon />
              <h1>Cart</h1>
            </Link>
          </div>
        </div>

        <div className="w-full sm:w-[80%] p-1">
          <div className=" flex overflow-x-auto gap-3 p-2">
            {product?.image?.map((img, idx) => (
              <img
                src={img.url}
                key={img.public_id}
                alt="Product"
                className="h-70 rounded-lg shadow-[0px_0px_2px_2px]"
              />
            ))}
          </div>
          <span className="text-blue-600 underline text-sm">
            Store Name : {product?.seller?.storeName}
          </span>
          <h1 className="text-2xl font-semibold tracking-[2px] font-serif">
            {product?.name}
          </h1>
          <h1 className="border w-fit px-4 rounded-lg bg-gray-300">
            {totalRating > 0
              ? (totalRating / product?.reviews?.length).toFixed(1)
              : 0}{" "}
            ⭐ | {product?.reviews?.length}
          </h1>
          <h1 className="">
            {product.stock == 0 ? (
              <span className="text-red-600 font-semibold tracking-[1px]">
                <span className="h-2 bg-red-400 w-2 border-2 inline-block rounded-full"></span>{" "}
                OUT OF STOCK
              </span>
            ) : product.stock <= 5 ? (
              <span className="text-orange-400 font-semibold tracking-[1px]">
                <span className="h-2 bg-orange-400 w-2 border-2 inline-block rounded-full"></span>{" "}
                LIMITED STOCK
              </span>
            ) : (
              <span className="text-green-600 font-semibold tracking-[1px]">
                <span className="h-2 bg-green-400 w-2 border-2 inline-block rounded-full"></span>{" "}
                AVAILABLE
              </span>
            )}
          </h1>
          <h1 className="text-3xl tracking-[1px] font-bold">
            ₹{product?.price}
          </h1>

          <div className="mt-2 flex justify-around gap-2 font-semibold ">
            <button
              disabled={product.stock == 0}
              className="border flex justify-center gap-3 w-1/2 p-2 rounded-lg active:bg-yellow-600 disabled:bg-gray-300 cursor-pointer"
              onClick={() => hanldeAddToCart(product._id, 1)}
            >
              <span>Add to Cart</span>
              {checkInCart && <span>QTY : {checkInCart?.quentity}</span>}
            </button>
            <button
              disabled={product.stock == 0}
              className="border w-1/2 p-2 rounded-lg bg-yellow-400 disabled:bg-gray-300 active:bg-yellow-600 cursor-pointer"
              onClick={() => handleBuyProduct(product._id, 1)}
            >
              But at <span className="tracking-[1px]">₹{product.price}</span>
            </button>
          </div>

          <div className="flex gap-2 text-lg font-semibold tracking-[1px]">
            <h1>Category :</h1>
            <h1 className="font-serif">{product?.category?.toUpperCase()}</h1>
          </div>
          <div className="font-semibold">
            <h1>Description :</h1>
            <h1 className="border p-1 rounded-lg">{product?.description}</h1>
          </div>

          <div className="px-2 rounded-lg font-semibold flex flex-col overflow-x-auto">
            <h1>All Reviews</h1>
            <div className="p-1 rounded-lg font-semibold flex gap-3 overflow-x-auto">
              {product?.reviews?.map((rev, idx) => (
                <div
                  key={idx}
                  className="border p-2 flex flex-col rounded-lg min-w-70 min-h-30 bg-gray-200 w-fit shadow-[0px_0px_2px_2px] shadow-blue-400"
                >
                  <div className="flex items-center gap-3">
                    <Rating readOnly value={rev.rating} />( {rev.rating} )
                  </div>
                  <h1 className="">{rev.review}</h1>
                  <h1 className="text-sm mt-auto flex justify-end items-center">
                    <PersonIcon />
                    {rev.user_id.name}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
