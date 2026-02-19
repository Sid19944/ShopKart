import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.js";
import {
  addNewReview,
  deleteReview,
  updateReview,
} from "../controllers/review.controller.js";

const router = Router();

router.route("/add/:product_id").post(verifyJwt, addNewReview);
router.route("/delete/:review_id").delete(verifyJwt, deleteReview);
router.route("/update/:review_id").put(verifyJwt, updateReview)

export default router;
