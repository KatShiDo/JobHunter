const express = require("express");
const router = express.Router();

const User = require("@/models/user");
const Ban = require("@/models/ban");

router.get("/all", async (req, res) => {
  try {
    const users = await User.find()
      .populate("ban", "expiresAt reason")
      .select("-password -confirmationToken");

    res.status(200).json(users);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.sendStatus(400);
    }

    await User.findByIdAndDelete(id);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { id, middlename, username, password, email, role } = req.body;

    if (!id) {
      return res.sendStatus(400);
    }

    await User.findByIdAndUpdate(id, {
      middlename,
      username,
      email,
      password,
      role,
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/ban", async (req, res) => {
  try {
    const { id, reason, expiresAt } = req.body;

    if (!id || !reason || !expiresAt) {
      return res.sendStatus(400);
    }

    const user = await User.findById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    const ban = await Ban.create({
      user: id,
      reason,
      expiresAt,
    });

    const updatedUser = await User.findByIdAndUpdate(id, {
      ban: ban,
    });

    await updatedUser.save();

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/unban", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.sendStatus(400);
    }

    const user = await User.findById(id);

    if (!user || !user.ban) {
      return res.sendStatus(404);
    }

    await Ban.findByIdAndDelete(user.ban);
    user.ban = null;
    await user.save();

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
