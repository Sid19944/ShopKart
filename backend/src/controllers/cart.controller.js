import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { Cart } from "../models/cart.schem.js";
import { Product } from "../models/product.schema.js";
import httpCode from "http-status-codes";

const addToCart = AsyncHandler(async (req, res, next) => {
  const { product_id, quentity } = req.body;

  if (!product_id || !quentity) {
    return next(new ErrorHandler("Provide product and quentity", 400));
  }

  const product = await Product.findById(product_id);
  console.log(product);
  if (!product) {
    return next(new ErrorHandler("Invalid Product", 400));
  }
  if (quentity <= 0 || product.stock < quentity) {
    return next(new ErrorHandler("Provide valid quentity", 400));
  }

  const haveCart = await Cart.findOne({ user_id: req.user._id });

  if (!haveCart) {
    const cart = await Cart.create({
      user_id: req.user._id,
      items: [
        {
          product_id: product._id,
          quentity,
        },
      ],
      total_price: product.price * quentity,
    });
    if (!cart) {
      return next(new ErrorHandler("Failed to add in cart", 400));
    }
    return res.status(httpCode.CREATED).json({
      success: true,
      message: "Product Added To Cart",
      cart,
    });
  }

  const productHaveInCart = haveCart.items.filter(
    (item) => item.product_id == product_id,
  );

  if (!productHaveInCart.length) {
    // if product is not already in cart then add product into cart
    haveCart.items.push({
      product_id,
      quentity,
    });
    haveCart.total_price += product.price * quentity;
    haveCart.save();
    return res.status(200).json({
      success: true,
      message: "New Product Added In Cart",
    });
  }

  // if Product is already in cart then update product quentity with new quentity
  productHaveInCart[0].quentity += quentity;
  if (product.stock < productHaveInCart[0].quentity) {
    return next(new ErrorHandler("Max Quentity Reached", 400));
  }

  haveCart.total_price += product.price * quentity;
  haveCart.save();

  return res.status(200).json({
    success: true,
    message: "Cart Updated",
    haveCart,
  });
});

const allCart = AsyncHandler(async (req, res, next) => {
  const carts = await Cart.find();
  if (!carts) {
    return res.status(200).json({
      success: true,
      message: "No cart created yet.",
    });
  }
  return res.status(200).json({
    success: true,
    carts,
  });
});

const updateCart = AsyncHandler(async (req, res, next) => {
  const cart_id = req.params.cart_id;
  const { product_id, quentity } = req.body;
  const cart = await Cart.findById(cart_id);
  const findProduct = await Product.findById(product_id);
  if (!findProduct) {
    return next(new ErrorHandler("Invalid product", 400));
  }

  let product = cart.items.filter((item) => item.product_id == product_id);
  product[0].quentity = quentity;

  if (product[0].quentity == 0) {
    cart.items = cart.items.filter((item) => item.product_id != product_id);
  }

  if (findProduct.stock < product[0].quentity) {
    return next(
      new ErrorHandler(`You can order max quentity ${findProduct.stock}`),
    );
  }
  cart.save();

  return res.status(200).json({
    success: true,
    message: "Cart Updated",
    cart,
  });
});



export { addToCart, updateCart, allCart };
