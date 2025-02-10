const express = require("express");
const router = express.Router();

const User = require("@/models/user");
const Vacancy = require("@/models/vacancy");
const Response = require("@/models/response");

const { ROLES } = require("@/constants/index");
const auth = require("@/middleware/auth");
const { checkBan } = require("@/middleware/ban");
const { checkEmail } = require("@/middleware/email");

router.get("/", async (req, res) => {
  try {
    const { query } = req.query;

    let searchConditions = {};
    if (query) {
      searchConditions = { title: { $regex: query, $options: "i" } };
    }

    const vacancies = await Vacancy.find(searchConditions)
        .select("-response -created -hardSkills -description")
        .sort({ created: -1 });

    res.status(200).json(vacancies);
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    res.sendStatus(500);
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id)
      .select("-response")
      .populate("company", "name phone address")
      .populate("user", "middlename email");

    if (!vacancy) {
      return res.sendStatus(404);
    }

    res.status(200).json(vacancy);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/my", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    const vacancies = await Vacancy.find({ company: user.company._id });

    const vacanciesWithResponses = vacancies.map((vacancy) => ({
      ...vacancy.toObject(),
      responses: vacancy.response.length,
    }));

    res.status(200).json(vacanciesWithResponses);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/create", auth, checkBan, checkEmail, async (req, res) => {
  try {
    const { title, description, leastSalary, highestSalary, hardSkills } =
      req.body;
    const userId = req.user.id;

    if (!title || !description) {
      return res.sendStatus(400);
    }

    const user = await User.findById(userId);

    if (user.role !== ROLES.Employer) {
      return res.sendStatus(400);
    }

    const vacancy = await Vacancy.create({
      title,
      description,
      leastSalary,
      highestSalary,
      hardSkills,
      user: userId,
      company: user.company._id,
    });

    await vacancy.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/delete", auth, checkBan, checkEmail, async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;

    const vacancy = await Vacancy.findById(id);
    const user = await User.findById(userId);

    if (vacancy?.user?.toString() !== userId && user.role !== ROLES.Admin) {
      return res.sendStatus(400);
    }

    await Response.deleteMany({ vacancy: id });
    await Vacancy.findByIdAndDelete(id);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post("/edit", auth, checkBan, checkEmail, async (req, res) => {
  try {
    const { id, title, description, leastSalary, highestSalary, hardSkills } =
      req.body;
    const userId = req.user.id;

    const vacancy = await Vacancy.findById(id);

    if (vacancy.user._id.toString() !== userId) {
      return res.sendStatus(400);
    }

    if (!title || !description) {
      return res.sendStatus(400);
    }

    await Vacancy.findByIdAndUpdate(id, {
      title,
      description,
      leastSalary,
      highestSalary,
      hardSkills,
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
