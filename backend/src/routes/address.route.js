import { Router } from "express";
import {
  addAddress,
  updateAddress,
  deleteAddress,
  getAllAddress,
  getSingleAddress,
  getAllAddressForCurrLoginUser,
} from "../controllers/address.controller.js";
import { verifyJwt } from "../middleware/verifyJWT.js";

const router = Router();

router.route("/add").post(verifyJwt, addAddress);
router.route("/update/:addid").put(verifyJwt, updateAddress);
router.route("/delete/:addid").delete(verifyJwt, deleteAddress);
router.route("/getall").get(verifyJwt, getAllAddress);
router.route("/single/:addid").get(verifyJwt, getSingleAddress);
router
  .route("/addresses-for-user")
  .get(verifyJwt, getAllAddressForCurrLoginUser);

export default router;
