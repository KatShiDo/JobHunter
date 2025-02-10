const express = require("express");
const router = express.Router();

const Response = require("@/models/response");
const Vacancy = require("@/models/vacancy");
const User = require("@/models/user");

const { ROLES } = require("@/constants");
const {checkBan} = require("../../middleware/ban");
const {checkEmail} = require("../../middleware/email");

router.post("/create", checkBan,checkEmail, async (req, res) => {
  try {
    const { id, skills, description } = req.body;
    const userId = req.user.id;

    if (!id || !skills) {
      return res.status(400).json({ message: "Bad request" });
    }

    const user = await User.findById(userId);

    if (user.role != ROLES.User) {
      return res.sendStatus(400);
    }

    const vacancy = await Vacancy.findById(id);

    if (!vacancy) {
      return res.sendStatus(400);
    }

    const response = await Response.create({
      skills,
      description,
      user: userId,
      vacancy: id,
      company: vacancy.company,
    });

    await response.save();

    res.status(200).json({ response: response });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    let responses;

    switch (user.role) {
      case ROLES.Admin:
        responses = await Response.find()
          .populate("user", "email")
          .populate("vacancy", "title");
        break;
      case ROLES.User:
        responses = await Response.find({ user: userId })
          .populate("user", "email")
          .populate("vacancy", "title");
        console.log(responses);
        break;
      case ROLES.Employer:
        responses = await Response.find({ company: user.company })
          .populate("user", "email")
          .populate("vacancy", "title");
        break;
      default:
        return res.sendStatus(500);
    }

    res.status(200).json(responses);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/delete", checkBan, checkEmail, async (req, res) => {
  try {
    const { id } = req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(user);

    const response = await Response.findById(id);

    if (!response) {
      return res.sendStatus(400);
    }

    switch (user.role) {
      case ROLES.Admin:
        await Response.findByIdAndDelete(id);
        break;
      case ROLES.User:
        console.log(userId, response.user.toString());
        if (response.user.toString() === userId) {
          await Response.findByIdAndDelete(id);
        } else {
          return res.sendStatus(400);
        }
        break;
      case ROLES.Employer:
        console.log(response);
        if (response.company.toString() === user.company.toString()) {
          await Response.findByIdAndDelete(id);
        } else {
          return res.sendStatus(400);
        }
        break;
      default:
        return res.sendStatus(500);
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
