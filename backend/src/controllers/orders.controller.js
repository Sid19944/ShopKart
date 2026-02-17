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

  const orders = [];
  for (const order_id of order_products) {
    const order = await Order_Item.findById(order_id);
    console.log(order)

    if (!order) {
      return next(new ErrorHandler("Invalid order ID", 400));
    }
  }
});

export { orderPlace };
