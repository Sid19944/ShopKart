import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { Address } from "../models/address.schema.js";
import { Order_Item } from "../models/order_items.schema.js";
import { Product } from "../models/product.schema.js";

const item_ordered = AsyncHandler(async (req, res, next) => {
  const { products, quentity, shippingAddress_id } = req.body;

  if (!products || !quentity || !shippingAddress_id) {
    return next(new ErrorHandler("Please provide all details", 400));
  }
  if (!Array.isArray(products)) {
    return next(new ErrorHandler("Please provide product's in array", 400));
  }

  const shippedAddress = await Address.findById(shippingAddress_id);
  if (!shippedAddress) {
    return next(
      new ErrorHandler(
        "Address Is not save yet, please save address first",
        400,
      ),
    );
  }

  let order_items = [];
  if (Array.isArray(products)) {
    for (const product_id of products) {
      const product = await Product.findById(product_id);
      if (!product) {
        return next(new ErrorHandler("Invalid Product ID", 400));
      }
      if (product.stock < quentity) {
        return next(
          new ErrorHandler(
            `You can't order more then ${product.stock} quentity`,
          ),
        );
      }

      const order = await Order_Item.create({
        buyer: req.user._id,
        product_id: product._id,
        name: product.name,
        img: {
          url: product.image[0].url,
          publid_id: product.image[0].public_id,
        },
        quentity,
        price: product.price,
        shippingAddress: {
          fullName: shippedAddress.fullname,
          addressLine: shippedAddress.addressLine,
          pincode: shippedAddress.pincode,
          country: shippedAddress.country,
          state: shippedAddress.state,
          district: shippedAddress.district,
          postOffice: shippedAddress.postOffice,
        },
      });

      order_items.push(order);
      if (!order) {
        if (order_items.length) {
          for (const order of order_items) {
            await Order_Item.findByIdAndDelete(order._id);
          }
        }
        return next(
          new ErrorHandler("Something went wrong while ordering", 400),
        );
      }
    }
  }

  return res.status(200).json({
    success: true,
    message: "Product Order Successfully",
    order_items,
  });
});

export { item_ordered };
