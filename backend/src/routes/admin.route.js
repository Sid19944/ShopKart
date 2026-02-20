import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.js";
import {
  approveProduct,
  approveSeller,
  approveUser,
  blockProduct,
  blockSeller,
  blockUser,
  getAllProducts,
  getAllSeller,
  getAllUser,
  getSellerRequest,
  // getSingleUser,
  allOrder_items,
} from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { deleteProduct } from "../controllers/products.controller.js";
const router = Router();

router.route("/user/get-all").get(verifyJwt, verifyAdmin, getAllUser);
router.route("/seller/get-all").get(verifyJwt, verifyAdmin, getAllSeller);

//user
// router.route("/user/get-one").get(verifyJwt,verifyAdmin,getSingleUser)
router.route("/user/approve/:user_id").put(verifyJwt, verifyAdmin, approveUser);
router.route("/user/block/:user_id").put(verifyJwt, verifyAdmin, blockUser);

// seller
router.route("/seller/requests").get(verifyJwt, verifyAdmin, getSellerRequest);
router
  .route("/seller/approve/:seller_id")
  .put(verifyJwt, verifyAdmin, approveSeller);
router
  .route("/seller/block/:seller_id")
  .put(verifyJwt, verifyAdmin, blockSeller);

// product
router.route("/product/get-all").get(verifyJwt, verifyAdmin, getAllProducts);
router
  .route("/product/block/:product_id")
  .put(verifyJwt, verifyAdmin, blockProduct);
router
  .route("/product/approve/:product_id")
  .put(verifyJwt, verifyAdmin, approveProduct);
router
  .route("/product/delete/:product_id")
  .delete(verifyJwt, verifyAdmin, deleteProduct);

// order Details
router.route("/order-item/get-all").get(verifyJwt, verifyAdmin, allOrder_items);

export default router;
