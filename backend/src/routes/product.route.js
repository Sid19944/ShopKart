import { Router } from "express";
import { getAllProducts, getSingleProductById } from "../controllers/products.controller.js";

const router = Router();

router.route("/:pageno").get(getAllProducts)
router.route("/one/:prodid").get(getSingleProductById)

export default router;
