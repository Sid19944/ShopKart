import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.js";
import { addToCart, allCart, updateCart } from "../controllers/cart.controller.js";
const router = Router()

router.route("/add-to-cart").post(verifyJwt,addToCart)
router.route("/update/:cart_id").put(verifyJwt, updateCart)

router.route("/all").get(verifyJwt, allCart)
export default router;