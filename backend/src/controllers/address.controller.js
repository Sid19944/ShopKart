import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { Address } from "../models/address.schema.js";

const addAddress = AsyncHandler(async (req, res, next) => {
  const user_id = req.user._id;

  console.log(req.body)

  const {
    fullname,
    addressLine,
    number,
    pincode,
    country,
    state,
    district,
    region,
  } = req.body;
  if (
    !fullname ||
    !addressLine ||
    !pincode ||
    !country ||
    !number ||
    !state ||
    !district ||
    !region
  ) {
    return next(new ErrorHandler("Please enter full address", 400));
  }

  if (number.toString().length < 10 || number.toString().length > 10) {
    return next(new ErrorHandler("Enter 10 digit Number", 400));
  }

  if (
    [fullname, addressLine, country, state, district, region].some(
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
    number,
    country: country.trim(),
    state: state.trim(),
    district: district.trim(),
    region: region.trim(),
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
    number: req?.body?.number,
    country: req?.body?.country?.trim(),
    state: req?.body?.state?.trim(),
    district: req?.body?.district?.trim(),
    region: req?.body?.region?.trim(),
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

  return res.status(200).json({
    success: true,
    message: "Address Deleted Successfully",
  });
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
