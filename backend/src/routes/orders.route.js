import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.js";
import { cancelOrder, orderPlace, getAllOrders, getOrdersForCussUser } from "../controllers/orders.controller.js";

const router = Router();

router.route("/order-place").post(verifyJwt, orderPlace);
router.route("/cancel-order/:order_id").put(verifyJwt, cancelOrder)
router.route("/curr-user").get(verifyJwt, getOrdersForCussUser)




router.route("/all").get(verifyJwt, getAllOrders)

export default router;
