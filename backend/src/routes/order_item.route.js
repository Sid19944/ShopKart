import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.js";
import { item_ordered } from "../controllers/order_item.controller.js";
const router = Router();

router.route("/order-place").post(verifyJwt, item_ordered)

export default router;
