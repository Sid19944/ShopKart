import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { Address } from "../models/address.schema.js";

const addAddress = AsyncHandler(async (req, res, next) => {
  const user_id = req.user._id;

  const {
    fullname,
    addressLine,
    pincode,
    country,
    state,
    district,
    postOffice,
  } = req.body;
  if (
    !fullname ||
    !addressLine ||
    !pincode ||
    !country ||
    !state ||
    !district ||
    !postOffice
  ) {
    return next(new ErrorHandler("Please enter full address", 400));
  }

  if (
    [fullname, addressLine, country, state, district, postOffice].some(
      (item) => item.trim() == "",
    )
  ) {
    return next(new ErrorHandler("Please enter full address", 400));
  }

  const address = await Address.create({
    user_id,
    fullname: fullname.trim(),
    addressLine: addressLine.trim(),
    pincode: pincode,
    country: country.trim(),
    state: state.trim(),
    district: district.trim(),
    postOffice: postOffice.trim(),
  });

  if (!address) {
    return next(new ErrorHandler("Someting went wrong", 500));
  }

  return res.status(201).json({
    success: true,
    message: "Address added",
    address,
  });
});

const updateAddress = AsyncHandler(async (req, res, next) => {
  const addId = req.params.addid;

  const newData = {
    fullname: req?.body?.fullname?.trim(),
    addressLine: req?.body?.addressLine?.trim(),
    pincode: req?.body?.pincode,
    country: req?.body?.country?.trim(),
    state: req?.body?.state?.trim(),
    district: req?.body?.district?.trim(),
    postOffice: req?.body?.postOffice?.trim(),
  };

  const address = await Address.findByIdAndUpdate(addId, newData, {
    new: true,
  });
  if (!address) {
    return next(new ErrorHandler("Someting went wrong", 500));
  }

  return res.status(200).json({
    success: true,
    message: "Address updated",
    address,
  });
});

const deleteAddress = AsyncHandler(async (req, res, next) => {
  const add_id = req.params.addid;
  const address = await Address.findByIdAndDelete(add_id);

  console.log(address);
});

const getSingleAddress = AsyncHandler(async (req, res, next) => {
  const add_id = req.params.addid;
  const address = await Address.findById(add_id);

  if (!address) {
    return next(new ErrorHandler("Address not exist", 400));
  }
  return res.status(200).json({
    success: true,
    address,
  });
});

const getAllAddress = AsyncHandler(async (req, res, next) => {
  const user_id = req.user._id;
  const address = await Address.find({ user_id });
  if (!address.length) {
    return res.status(200).json({
      success: true,
      message: "You don't have any address",
    });
  }

  return res.status(200).json({ success: true, address });
});

const getAllAddressForCurrLoginUser = AsyncHandler(async (req, res, next) => {
  const allAddress = await Address.find({ user_id: req.user._id });
  if (!allAddress.length) {
    return res.status(200).json({
      success: true,
      message: "User did't store any address yet",
    });
  }

  return res.status(200).json({
    success: true,
    allAddress,
  });
});

export {
  addAddress,
  updateAddress,
  deleteAddress,
  getSingleAddress,
  getAllAddress,
  getAllAddressForCurrLoginUser,
};
