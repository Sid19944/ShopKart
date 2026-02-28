import { Router } from "express";
import {
  addNewProduct,
  addMoreProductImage,
  updateProduct,
  deleteProductImage,
  getSingleProductById,
  getProductsByCategory,
  deleteProduct,
  getSingleProductByName,
} from "../controllers/products.controller.js";
import { verifySeller } from "../middleware/verifySeller.js";
import { verifyJwt } from "../middleware/verifyJWT.js";
import {
  getCurrSeller,
  getMonthlyReport,
  getOverviewInfo,
  getSellerProduct,
  wantSeller,
} from "../controllers/seller.controller.js";
import {
  getAllOrderedProducts,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order_item.controller.js";
const router = Router();

// want seller
router.route("/want").post(verifyJwt, wantSeller);

router.route("/get-curr-seller").get(verifyJwt, verifySeller, getCurrSeller);

// product
router
  .route("/get-products/:page_no")
  .get(verifyJwt, verifySeller, getSellerProduct);
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

router
  .route("/get/product-by-id/:prodid")
  .get(verifyJwt, verifySeller, getSingleProductById);
router
  .route("/get/product-by-name/:name")
  .get(verifyJwt, verifySeller, getSingleProductByName);
router
  .route("/get/product-category/:category")
  .get(verifyJwt, verifySeller, getProductsByCategory);
router
  .route("/delete/:product_id")
  .delete(verifyJwt, verifySeller, deleteProduct);

// order
router
  .route("/get-ordered-products/:page_no")
  .get(verifyJwt, verifySeller, getAllOrderedProducts);
router
  .route("/update/order-status/:order_id")
  .put(verifyJwt, verifySeller, updateOrderStatus);
router
  .route("/get/order-by-id/:order_id")
  .get(verifyJwt, verifySeller, getOrderById);

// overview section
router
  .route("/get-overview-info")
  .get(verifyJwt, verifySeller, getOverviewInfo);

router
  .route("/get-monthly-report")
  .get(verifyJwt, verifySeller, getMonthlyReport);
export default router;
