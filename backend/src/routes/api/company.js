const express = require("express");
const router = express.Router();

const Company = require("@/models/company");
const User = require("@/models/user");
const Vacancy = require("@/models/vacancy");
const Response = require("@/models/response");

const { ROLES } = require("@/constants");
const {checkBan} = require("@/middleware/ban");
const {checkEmail} = require("../../middleware/email");

router.get("/", async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user.id });

    if (!company) {
      return res.sendStatus(404);
    }

    res.status(200).json({ company: company });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/create", checkBan, async (req, res) => {
  try {
    const { name, address, description } = req.body;
    const userId = req.user.id;

    if (!name || !address || !description) {
      return res.sendStatus(400);
    }

    const user = await User.findById(userId);

    if (user.company) {
      return res.sendStatus(400);
    }

    const company = await Company.create({
      name,
      address,
      description,
      user: userId,
    });

    const updatedUser = await User.findByIdAndUpdate(userId, {
      company: company._id,
      role: user.role === ROLES.Admin ? ROLES.Admin : ROLES.Employer,
    });

    await updatedUser.save();

    res.status(200).json({ company: company });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/disband", checkBan, async (req, res) => {
  try {
    const userId = req.user.id;

    const company = await Company.findOne({ user: userId });
    const user = await User.findById(userId);

    if (!company) {
      return res.sendStatus(404);
    }

    await Vacancy.deleteMany({ company: company._id });
    await Response.deleteMany({ company: company._id });
    await Company.deleteOne({ _id: company._id });

    await User.findByIdAndUpdate(req.user.id, {
      $unset: { company: "" },
      role: user.role === ROLES.Admin ? ROLES.Admin : ROLES.User,
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
