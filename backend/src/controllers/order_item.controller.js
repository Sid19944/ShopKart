import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { Address } from "../models/address.schema.js";
import { Order_Item } from "../models/order_items.schema.js";
import { Product } from "../models/product.schema.js";

const item_ordered = AsyncHandler(async (req, res, next) => {
  const { products, shippingAddress_id } = req.body;

  if (!products || !shippingAddress_id) {
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
    for (const fProduct of products) {
      const product = await Product.findById(fProduct.product_id);
      if (!product) {
        return next(new ErrorHandler("Invalid Product ID", 400));
      }
      if (!product.isApproved) {
        return next(new ErrorHandler("Product is not allow to order", 400));
      }
      if (product.stock == 0) {
        return res.status(200).json({
          success: true,
          message: "Product is Out of Stock",
        });
      }
      if (product.stock < fProduct.quentity) {
        return next(
          new ErrorHandler(
            `You can't order more then ${product.stock} quentity`,
          ),
        );
      }

      const order = await Order_Item.create({
        buyer: req.user._id,
        seller_id: product.seller,
        product_id: product._id,
        name: product.name,
        img: {
          url: product.image[0].url,
          public_id: product.image[0].public_id,
        },
        category: product.category,
        quentity: fProduct.quentity,
        itemPrice: product.price,
        shippingAddress: {
          fullName: shippedAddress.fullname,
          addressLine: shippedAddress.addressLine,
          number : shippedAddress.number,
          pincode: shippedAddress.pincode,
          country: shippedAddress.country,
          state: shippedAddress.state,
          district: shippedAddress.district,
          region: shippedAddress.region,
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

      const newStock = product.stock - fProduct.quentity;
      await Product.findByIdAndUpdate(fProduct.product_id, {
        $set: {
          stock: newStock,
        },
      });
    }
  }

  return res.status(200).json({
    success: true,
    message: "Product Order Successfully",
    order_items,
  });
});

// seller
const getAllOrderedProducts = AsyncHandler(async (req, res, next) => {
  const page_no = req.params.page_no;
  const tOrder = await Order_Item.find({
    product_id: { $in: req.seller.products },
  });
  const orders = await Order_Item.find({
    product_id: { $in: req.seller.products },
  })
    .populate("buyer")
    .limit(10)
    .skip((page_no - 1) * 10);

  return res.status(200).json({
    success: true,
    orders,
    totalOrder: tOrder.length,
  });
});

const updateOrderStatus = AsyncHandler(async (req, res, next) => {
  const order_id = req.params.order_id;
  const { orderStatus } = req.body;
  const order = await Order_Item.findByIdAndUpdate(
    order_id,
    {
      $set: {
        order_status: orderStatus,
      },
    },
    { new: true },
  );
  if (!order) {
    return next(new ErrorHandler("Invalid Order ID", 400));
  }

  return res.status(200).json({
    success: true,
    message: `Order status updated to ${order.order_status}`,
  });
});

const getOrderById = AsyncHandler(async (req, res, next) => {
  const order_id = req.params.order_id;
  const fOrder = await Order_Item.findById(order_id);

  if (!fOrder) return next(new ErrorHandler("Invalid Order ID", 400));

  const order = req.seller?.products?.filter(
    (prod) => prod.toString() === fOrder?.product_id.toString(),
  );

  if (!order.length) {
    return next(new ErrorHandler("This is not your order", 400));
  }

  return res.status(200).json({
    success: true,
    orders: [fOrder],
  });
});

export { item_ordered, getAllOrderedProducts, updateOrderStatus, getOrderById };
