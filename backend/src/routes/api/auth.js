const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const passport = require("passport");

const auth = require("@/middleware/auth");

const User = require("@/models/user");
const mailer = require("@/services/mailer");
const keys = require("@/config/keys");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../../services/token");
const user = require("nodemailer/lib/smtp-connection");

const { refreshSecret } = keys.jwt;

router.post("/login", async (req, res) => {
  try {
    const { email, password, fingerprint } = req.body;

    if (!email || !password || !fingerprint) {
      return res.sendStatus(400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.sendStatus(400);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ code: "INVALID_PASSWORD" });
    }

    const refreshToken = generateRefreshToken(user.id, fingerprint);
    const accessToken = generateAccessToken(user.id);

    if (!accessToken || !refreshToken) {
      return res.sendStatus(400);
    }

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, fingerprint } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ code: "MISSING_FIELDS" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ code: "USER_ALREADY_EXISTS" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const confirmationToken = crypto.randomBytes(32).toString("hex");

    const user = new User({
      username,
      email,
      password: hash,
      confirmationToken,
    });

    await user.save();

    await mailer.sendEmail(email, "signup", {
      token: confirmationToken,
      language: req.headers["accept-language"].split(",")[0].split("-")[0],
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id, fingerprint);

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken, fingerprint } = req.body;

    if (!refreshToken) {
      return res.sendStatus(400);
    }

    jwt.verify(refreshToken, refreshSecret, async (err, decoded) => {
      if (err) {
        return res.sendStatus(400);
      }

      if (decoded.fingerprint !== fingerprint) {
        return res.sendStatus(400);
      }

      const user = await User.findById(decoded.id);

      if(!user) {
        return res.sendStatus(400);
      }

      const accessToken = generateAccessToken(decoded.id);

      res.status(200).json({
        accessToken: accessToken,
      });
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.sendStatus(400);
    }

    const user = await User.findOne({ confirmationToken: token });

    if (!user) {
      return res.sendStatus(400);
    }

    user.confirmed = true;
    user.confirmationToken = undefined;
    user.save();

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/resend-token", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.sendStatus(400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.sendStatus(400);
    }

    if (user.confirmed) {
      return res.sendStatus(400);
    }

    if (!user.token) {
      user.token = crypto.randomBytes(32).toString("hex");
      user.save();
    }

    await mailer.sendEmail(email, "signup", {
      token: user.token,
      language: req.headers["accept-language"].split(",")[0].split("-")[0],
    });

    return res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
});

router.post("/forgot", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.sendStatus(400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.sendStatus(400);
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;

    user.save();

    await mailer.sendEmail(email, "reset", {
      token: resetToken,
      language: req.headers["accept-language"].split(",")[0].split("-")[0],
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/change", async (req, res) => {
  try {
    const { password, token } = req.body;

    if (!password) {
      return res.sendStatus(400);
    }

    const resetUser = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!resetUser) {
      return res.sendStatus(400);
    }

    const salt = await bcrypt.genSalt(10);

    resetUser.password = await bcrypt.hash(password, salt);
    resetUser.resetPasswordToken = undefined;
    resetUser.resetPasswordExpires = undefined;
    resetUser.save();

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/delete", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get("/yandex", (req, res, next) => {
  const fingerprint = req.query.fingerprint;
  if (!fingerprint) {
    return res.sendStatus(400);
  }
  return passport.authenticate("yandex", {
    session: false,
    state: fingerprint,
  })(req, res, next);
});

router.get(
  "/yandex/callback",
  passport.authenticate("yandex", {
    failureRedirect: `${keys.app.clientURL}/login`,
    session: false,
  }),
  (req, res) => {
    const fingerprint = req.query.state;
    const refreshToken = generateRefreshToken(req.user.id, fingerprint);
    res.redirect(
      `${keys.app.clientURL}/auth/success?refreshToken=${refreshToken}`,
    );
  },
);

router.get("/vkontakte", (req, res, next) => {
  const fingerprint = req.query.fingerprint;
  if (!fingerprint) {
    return res.sendStatus(400);
  }
  return passport.authenticate("vkontakte", {
    session: false,
    state: fingerprint,
  })(req, res, next);
});

router.get(
  "/vkontakte/callback",
  passport.authenticate("vkontakte", {
    failureRedirect: `${keys.app.clientURL}/login`,
    session: false,
  }),
  (req, res) => {
    const fingerprint = req.query.state;
    const refreshToken = generateRefreshToken(req.user.id, fingerprint);
    res.redirect(
      `${keys.app.clientURL}/auth/success?refreshToken=${refreshToken}`,
    );
  },
);

module.exports = router;
