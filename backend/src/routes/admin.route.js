import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.js";
import {
  approveSeller,
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



router
  .route("/seller/approve/:seller_id")
  .put(verifyJwt, verifyAdmin, approveSeller);
router
  .route("/seller/block/:seller_id")
  .put(verifyJwt, verifyAdmin, blockSeller);



export default router;
