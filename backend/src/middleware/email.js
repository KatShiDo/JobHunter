const User = require("@/models/user");

exports.checkEmail = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.sendStatus(404);
    }

    const confirmed = await user.confirmed;

    if (!confirmed) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    res.sendStatus(500);
  }
};
