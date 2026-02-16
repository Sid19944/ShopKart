import { Router } from "express";
import {} from "../controllers/address.controller.js";
import {
  addAddress,
  updateAddress,
  deleteAddress,
  getAllAddress,
  getSingleAddress,
} from "../controllers/address.controller.js";
import { verifyJwt } from "../middleware/verifyJWT.js";

const router = Router();

router.route("/add").post(verifyJwt, addAddress);
router.route("/update/:addid").put(verifyJwt, updateAddress);
router.route("/delete/:addid").delete(verifyJwt, deleteAddress);
router.route("/getall").get(verifyJwt, getAllAddress);
router.route("/single/:addid").get(verifyJwt, getSingleAddress);

export default router;
