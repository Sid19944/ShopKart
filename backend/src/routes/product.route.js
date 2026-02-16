import { Router } from "express";
import { getAllProducts, getSingleProduct } from "../controllers/products.controller.js";

const router = Router();

router.route("/:pageno").get(getAllProducts)
router.route("/one/:prodid").get(getSingleProduct)

export default router;
