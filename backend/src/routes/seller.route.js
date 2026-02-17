import { Router } from "express";
import {
  addNewProduct,
  addMoreProductImage,
  updateProduct,
  deleteProductImage,
  getSingleProduct,
  getProductsByCategory,
} from "../controllers/products.controller.js";
import { verifySeller } from "../middleware/verifySeller.js";
import { verifyJwt } from "../middleware/verifyJWT.js";
import { getSellerProduct, wantSeller } from "../controllers/seller.controller.js";
import { getAllOrderedProducts, updateOrderStatus } from "../controllers/order_item.controller.js";
const router = Router();

router.route("/want").post(verifyJwt,wantSeller)

router.route("/get-all-products").get(verifyJwt, verifySeller, getSellerProduct);
router.route("/add-product").post(verifyJwt, verifySeller, addNewProduct);
router
  .route("/update-product/:prod_id")
  .put(verifyJwt, verifySeller, updateProduct);

router
  .route("/add/product-image/:prodid")
  .put(verifyJwt, verifySeller, addMoreProductImage);
router
  .route("/:prodid/delete/:imgid")
  .delete(verifyJwt, verifySeller, deleteProductImage);

router.route("/get/product/:prodid").get(verifyJwt,verifySeller, getSingleProduct)
router.route("/get/product-category/:category").get(verifyJwt, verifySeller,getProductsByCategory)


// order
router.route("/get-ordered-products").get(verifyJwt,verifySeller, getAllOrderedProducts)
router.route("/update/order-status/:order_id").put(verifyJwt,verifySeller,updateOrderStatus)
export default router;
