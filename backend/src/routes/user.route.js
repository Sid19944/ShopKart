import { Router } from "express";
import passport from "passport";
import { githubLogin, googleAuthLogin } from "../controllers/auth.controller.js";

const router = Router();

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
  googleAuthLogin,
);

router
  .route("/github")
  .get(passport.authenticate("github", { scope: ["user:email"] }));

router
  .route("/github/callback")
  .get(
    passport.authenticate("github", { scope: ["user:email"], session: false }), githubLogin
  );

export default router;
