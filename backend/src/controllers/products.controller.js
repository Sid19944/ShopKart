import { Product } from "../models/product.schema.js";
import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { v2 as cloudinary } from "cloudinary";
import httpStatus from "http-status-codes";

const addNewProduct = AsyncHandler(async (req, res, next) => {
  const { name, description, price, stock, category } = req.body;
  const seller = req.user._id;

  if (!name || !description || !price || !stock || !category) {
    return next(new ErrorHandler("Please provide all details", 400));
  }

  if (
    [name, description, price, stock, category].some(
      (item) => item.trim() == "",
    )
  ) {
    return next(new ErrorHandler("Please provide all details", 400));
  }

  let uploadedImage = [];
  if (req.files && req.files.image) {
    const image = Array.isArray(req.files.image)
      ? req.files.image
      : [req.files.image];

    for (const img of image) {
      const response = await cloudinary.uploader.upload(img.tempFilePath, {
        folder: "E-Commerece Products",
      });

      uploadedImage.push({
        public_id: response.public_id,
        url: response.secure_url,
      });
    }
  }

  const product = await Product.create({
    name: name.trim(),
    description: description.trim(),
    image: uploadedImage,
    price,
    stock,
    category,
    seller,
  });

  if (!product) {
    for (const img of uploadedImage) {
      await cloudinary.uploader.destroy(img.public_id);
    }
  }

  return res.status(200).json({
    success: true,
    message: "New Product added",
    product,
  });
});

const addMoreProductImage = AsyncHandler(async (req, res, next) => {
  const prod_id = req.params.prodid;
  const image = req?.files?.image;

  if (!image) {
    return next(new ErrorHandler("Provide new Image", 400));
  }

  let uploadedImage = [];
  if (req.files && req.files.image) {
    const images = Array.isArray(req.files.image)
      ? req.files.image
      : [req.files.image];

    for (const img of images) {
      const response = await cloudinary.uploader.upload(img.tempFilePath, {
        folder: "E-Commerece Products",
      });
      uploadedImage.push({
        public_id: response.public_id,
        url: response.secure_url,
      });

      if (!response) {
        return next(new ErrorHandler("Something went wrong", 500));
      }
    }
  }

  // check the current user is the seller of the product
  const checkSeller = await Product.findById(prod_id)
  if(checkSeller.seller != req.user._id && req.user.role != "admin"){
    return next(new ErrorHandler("Unauthorized Access",400))
  }

  const product = await Product.findByIdAndUpdate(
    prod_id,
    {
      $push: {
        image: {
          $each: uploadedImage,
        },
      },
    },
    {
      new: true,
    },
  );

  if (!product) {
    uploadedImage.map(async (img) => {
      await cloudinary.uploader.destroy(img.public_id);
    });

    return next(new ErrorHandler("product not found", 400));
  }

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Image added",
    product,
  });
});

const updateProduct = AsyncHandler(async (req, res, next) => {
  const prod_id = req.params.prod_id;

  const newData = {
    name: req?.body?.name?.trim(),
    description: req?.body?.description?.trim(),
    price: req?.body?.price,
    category: req?.body?.category,
    discount: req?.body?.discount,
  };

  // check the current user is the seller of the product
  const checkSeller = await Product.findById(prod_id)
  if(checkSeller.seller != req.user._id && req.user.role != "admin"){
    return next(new ErrorHandler("Unauthorized Access",400))
  }

  const product = await Product.findByIdAndUpdate(prod_id, newData, {
    new: true,
  });
  if (!product) {
    await cloudinary.uploader.destroy(newData.image[0].public_id);
    return next(new ErrorHandler("Product not found", 500));
  }

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Product updated",
    product,
  });
});

const deleteProductImage = AsyncHandler(async (req, res, next) => {
  const prod_id = req.params.prodid;
  const img_id = req.params.imgid;

  const findProduct = await Product.findById(prod_id);
  const image = findProduct.image.filter((img) => img._id == img_id);

  // check the current user is the seller of the product
  const checkSeller = await Product.findById(prod_id)
  if(checkSeller.seller != req.user._id && req.user.role != "admin"){
    return next(new ErrorHandler("Unauthorized Access",400))
  }

  const product = await Product.findByIdAndUpdate(
    prod_id,
    {
      $pull: {
        image: {
          _id: img_id,
        },
      },
    },
    { new: true },
  );

  await cloudinary.uploader.destroy(image[0].public_id);

  return res
    .status(200)
    .json({ success: true, message: "image deleted", product });
});

const getAllProducts = AsyncHandler(async (req, res, next) => {
  const page = req.params.pageno;
  if (page < 1) {
    return next(new ErrorHandler("Provide valid page no.", 400));
  }
  const products = await Product.find()
    .limit(10)
    .skip((page - 1) * 10);

  if(!products.length){
    return next(new ErrorHandler("Provide valid page no.", 400));
  }
  
  return res.status(200).json({
    success: true,
    products,
  });
});

const getSingleProduct = AsyncHandler(async (req, res, next) => {
  const prod_id = req.params.prodid;
  const product = await Product.findById(prod_id);
  if (!product) {
    return next(new ErrorHandler("Product is not available", 400));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

const getProductsByCategory = AsyncHandler(async (req, res, next) => {
  const category = req.params.category;
  const products = await Product.find({ category });
  if (!products.length) {
    return res.status(200).json({
      success: true,
      message: `No Product with ${category} category`,
    });
  }

  return res.status(200).json({
    success: true,
    products,
  });
});

export {
  getAllProducts,
  addNewProduct,
  addMoreProductImage,
  updateProduct,
  deleteProductImage,
  getSingleProduct,
  getProductsByCategory,
};
