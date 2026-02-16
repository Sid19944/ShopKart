import { AsyncHandler } from "../utils/Async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { User } from "../models/user.schema.js";

const updateUserRole = AsyncHandler(async (req, res, next) => {
  const { userid } = req.params;
  const user = await User.findByIdAndUpdate(
    userid,
    {
      role: req.body.role,
    },
    { new: true },
  );

  res.json(user);
});

const getAllUser = AsyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

export { updateUserRole, getAllUser };
