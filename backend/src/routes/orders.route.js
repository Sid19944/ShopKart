import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.js";
import { orderPlace } from "../controllers/orders.controller.js";

const router = Router();

router.route("/order-place").post(verifyJwt, orderPlace);

export default router;
