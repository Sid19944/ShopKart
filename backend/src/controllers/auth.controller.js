import { User } from "../models/user.schema.js";
import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { genAccAndRefToken } from "../middleware/genAccAndRefToken.js";

const googleAuthLogin = AsyncHandler(async (req, res, next) => {
  const userExist = await User.findOne({ auth_id: req.user._json.sub });

  if (!userExist) {
    const user = await User.create({
      auth_id: req.user._json.sub,
      name: req.user._json.name,
      firstName: req.user._json.given_name,
      lastName: req.user._json.family_name,
      avatar: req.user._json.picture,
      email: req.user._json.email,
      provider: req.user.provider,
    });

    if (!user) {
      return next(ErrorHandler("Someting went wrong", 500));
    }

    const { accessToken, refreshToken } = await genAccAndRefToken(user);

    if (!accessToken || !refreshToken) {
      return next(
        ErrorHandler("Something went wrong while generate token", 500),
      );
    }

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "none",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .redirect(process.env.FRONTEND_URL);
  }

  const { accessToken, refreshToken } = await genAccAndRefToken(userExist);
  if (!accessToken || !refreshToken) {
    return next(ErrorHandler("Something went wrong while generate token", 500));
  }

  return res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .redirect(process.env.FRONTEND_URL);
});

const githubLogin = AsyncHandler(async (req, res, next) => {
  const userExist = await User.findOne({ auth_id: req.user.id });

  if (!userExist) {
    const user = await User.create({
      auth_id: req.user._json.id,
      name: req.user._json.name,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider,
    });

    if (!user) {
      return next(ErrorHandler("Someting went wrong", 500));
    }

    const { accessToken, refreshToken } = await genAccAndRefToken(user);

    if (!accessToken || !refreshToken) {
      return next(
        ErrorHandler("Something went wrong while generate token", 500),
      );
    }

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "none",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User register successfully",
      });
  }

  const { accessToken, refreshToken } = await genAccAndRefToken(userExist);
  if (!accessToken || !refreshToken) {
    return next(ErrorHandler("Something went wrong while generate token", 500));
  }

  return res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      message: "User Login successfully",
    });
});

const getCurrUser = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("Invalid user ID", 400));
  }
  return res.status(200).json({
    success: true,
    user,
  });
});

const logout = AsyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    $unset: { refreshToken: 1 },
  });

  return res
    .clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "User Logged Out.",
    });
});

export { googleAuthLogin, githubLogin, getCurrUser, logout };
