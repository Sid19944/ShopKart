import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.js";
import {
  approveProduct,
  approveSeller,
  blockProduct,
  blockSeller,
  getAllUser,
  updateUserRole,
} from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = Router();

router
  .route("/update/role/:userid")
  .post(verifyJwt, verifyAdmin, updateUserRole);
router.route("/get-all").get(verifyJwt, verifyAdmin, getAllUser);

// seller
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

export default router;
