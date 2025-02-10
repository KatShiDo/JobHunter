const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const User = require("@/models/user");
const Company = require("@/models/company");
const Vacancy = require("@/models/vacancy");
const Response = require("@/models/response");

const { uploadImage } = require("@/utils/multer");
const { checkBan } = require("@/middleware/ban");
const { checkEmail } = require("../../middleware/email");
const crypto = require("crypto");
const mailer = require("@/services/mailer");

router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate("ban", "expiresAt reason")
      .populate("company", "address description name")
      .select(["-password", "-confirmationToken"]);

    res.status(200).json(user);
  } catch {
    res.sendStatus(400);
  }
});

router.post("/delete", async (req, res) => {
  try {
    const id = req.user.id;

    const company = await Company.find({ user: id });

    await Vacancy.deleteMany({ user: id });
    await Response.deleteMany({ company: company._id });
    await Response.deleteMany({ user: id });
    await Company.deleteOne({ user: id });
    await User.findByIdAndDelete(id);

    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
});

router.post("/edit", checkBan, async (req, res) => {
  try {
    const userId = req.user.id;
    const allowedFields = ["email", "middlename", "username"];
    const updateUserData = {};

    const user = await User.findById(userId).select("email");

    for (const key in req.body) {
      if (allowedFields.includes(key)) {
        updateUserData[key] = req.body[key];
      }
    }

    if (req.body.email && req.body.email !== user.email) {
      const confirmationToken = crypto.randomBytes(32).toString("hex");

      const user = await User.findById(userId);

      user.confirmationToken = confirmationToken;
      user.confirmed = false;

      await mailer.sendEmail(user.email, "signup", {
        token: confirmationToken,
        language: req.headers["accept-language"].split(",")[0].split("-")[0],
      });
      user.save()
    }

    if (req.body.address) {
      const userWithCompany = await User.findById(userId).populate("company");

      if (!userWithCompany.company) {
        return res.status(400).json({ error: "Компания не найдена" });
      }

      userWithCompany.company.address = req.body.address;
      await userWithCompany.company.save();
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateUserData,
        { new: true, runValidators: true }
    ).select(["-password", "-confirmationToken"]);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post(
  "/avatar/upload", checkBan,
  uploadImage.single("avatar"),
  async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.sendStatus(404);
      }

      if (user.avatar) {
        const oldAvatarPath = path.join(
          __dirname,
          "../../uploads/",
          user.avatar,
        );
        fs.unlink(oldAvatarPath, (err) => {
          if (err) {
            console.error("Failed to delete old avatar:", err);
          }
        });
      }

      user.avatar = req.file.filename;
      await user.save();

      const updatedUser = await User.findById(userId).select([
        "-password",
        "-confirmationToken",
      ]);

      res.status(200).json(updatedUser);
    } catch {
      res.sendStatus(400);
    }
  },
);

router.get("/avatar", async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("avatar");

    if (!user || !user.avatar) {
      return res.status(200).json({ avatar: "" });
    }

    res.status(200).json({ avatar: user.avatar });
  } catch {
    res.sendStatus(400);
  }
});

module.exports = router;
