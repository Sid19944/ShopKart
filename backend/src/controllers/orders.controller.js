import { Cart } from "../models/cart.schem.js";
import { Order_Item } from "../models/order_items.schema.js";
import { Orders } from "../models/orders.schema.js";
import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";

const orderPlace = AsyncHandler(async (req, res, next) => {
  const { order_products, paymentMethod } = req.body;

  if (!order_products || !paymentMethod) {
    return next(new ErrorHandler("Please prove all details", 400));
  }
  if (!Array.isArray(order_products)) {
    return next(
      new ErrorHandler("Please provide order_products in an array", 400),
    );
  }

  const order_items = [];
  let shippingAddress = "";
  let totalPrice = null;
  for (const order_id of order_products) {
    const order = await Order_Item.findById(order_id);

    if (!order) {
      return next(new ErrorHandler("Invalid order ID", 400));
    }

    order_items.push({
      product_id: order.product_id,
      name: order.name,
      img: order.img,
      quentity: order.quentity,
      price: order.price,
      totalPrice: order.price * order.quentity,
    });
    shippingAddress = order.shippingAddress;
  }

  for (const product of order_items) {
    totalPrice += product.totalPrice;
  }

  const order = await Orders.create({
    user_id: req.user._id,
    order_items,
    numberOfProduct: order_items.length,
    totalPrice,
    shippingAddress,
    paymentMethod,
  });

  if (!order) {
    return next(
      new ErrorHandler("Something went wrong while place order", 500),
    );
  }

  await Cart.findOneAndUpdate(
    {
      user_id: req.user._id,
    },
    { $set: { items: [], total_price: 0 } },
  );

  return res.status(200).json({
    success: true,
    message: "Order Place Successfully",
    order,
  });
});

export { orderPlace };
