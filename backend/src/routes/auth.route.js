import { Router } from "express";
import passport from "passport";
import {
  getCurrUser,
  githubLogin,
  googleAuthLogin,
  logout,
} from "../controllers/auth.controller.js";
import { verifyJwt } from "../middleware/verifyJWT.js";

const router = Router();

router.route("/google").get((req, res, next) => {
  const panel = req.query.panel;

  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: panel,
  })(req, res, next);
});

router.route("/google/callback").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
  googleAuthLogin,
);

router.route("/github").get((req, res, next) => {
  const panel = req.query.panel;
  passport.authenticate("github", { scope: ["user:email"], state: panel })(
    req,
    res,
    next,
  );
});

router
  .route("/github/callback")
  .get(
    passport.authenticate("github", { scope: ["user:email"], session: false }),
    githubLogin,
  );

router.route("/get-curr-user").get(verifyJwt, getCurrUser);
router.route("/logout").post(verifyJwt, logout);

export default router;
