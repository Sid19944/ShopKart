import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.js";
import { cancelOrder, getOrderByIdUser, getOrdersForCussUser, item_ordered } from "../controllers/order_item.controller.js";
const router = Router();

router.route("/order-place").post(verifyJwt, item_ordered)
router.route("/get-order-curr-user").get(verifyJwt, getOrdersForCussUser)
router.route("/cancel-order/:order_id").put(verifyJwt, cancelOrder)
router.route("/get-order-by-id/:order_id").get(verifyJwt,getOrderByIdUser)

export default router;
