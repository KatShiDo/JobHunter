const express = require("express");
const router = express.Router();

const User = require("@/models/user");
const mailer = require("@/services/mailer");

router.post("/", async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.sendStatus(400);
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.sendStatus(400);
    }

    mailer
      .sendEmail(process.env.EMAIL, "contact", {
        subject: subject,
        message: message,
        email: user.email,
        language: "ru",
      })
      .then(() => {
        res.sendStatus(200);
      })

  } catch (error) {
      console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
