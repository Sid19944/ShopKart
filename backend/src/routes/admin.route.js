import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.js";
import {
  approveProduct,
  approveSeller,
  blockProduct,
  blockSeller,
  getAllUser,
  getSellerRequest,
  orderDetails,
} from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
const router = Router();

router.route("/get-all").get(verifyJwt, verifyAdmin, getAllUser);

// seller
router.route("/seller/requests").get(verifyJwt, verifyAdmin, getSellerRequest);
router
  .route("/seller/approve/:seller_id")
  .put(verifyJwt, verifyAdmin, approveSeller);
router
  .route("/seller/block/:seller_id")
  .put(verifyJwt, verifyAdmin, blockSeller);

// product
router
  .route("/product/block/:product_id")
  .put(verifyJwt, verifyAdmin, blockProduct);
router
  .route("/product/approve/:product_id")
  .put(verifyJwt, verifyAdmin, approveProduct);

router.route("/order-details").get(verifyJwt, verifyAdmin, orderDetails);

export default router;
