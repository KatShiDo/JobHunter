const express = require("express");
const router = express.Router();

const User = require("@/models/user");
const Company = require("@/models/company");
const Vacancy = require("@/models/vacancy");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.countDocuments();
    const allCompany = await Company.countDocuments();
    const allVacancy = await Vacancy.countDocuments();

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const perMounthUsers = await User.countDocuments({
      created: { $gte: oneMonthAgo },
    });
    const perMounthCompany = await Company.countDocuments({
      created: { $gte: oneMonthAgo },
    });
    const perMounthVacancy = await Vacancy.countDocuments({
      created: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      allUsers,
      allCompany,
      allVacancy,
      perMounthUsers,
      perMounthCompany,
      perMounthVacancy,
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
