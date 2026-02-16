import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.js";
import {getAllUser, updateUserRole} from "../controllers/admin.controller.js"
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = Router();

router.route("/update/role/:userid").post(verifyJwt, verifyAdmin, updateUserRole);
router.route("/get-all").get(verifyJwt,verifyAdmin, getAllUser);

export default router;
