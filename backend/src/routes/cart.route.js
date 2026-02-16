import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.js";
import { addToCart } from "../controllers/cart.controller.js";
const router = Router()

router.route("/add-to-cart").post(verifyJwt,addToCart)

export default router;