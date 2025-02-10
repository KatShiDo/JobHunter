const express = require("express");
const router = express.Router();

const Report = require("@/models/report");

router.post("/create", async (req, res) => {
  try {
    const { reasonUrl, reason } = req.body;
    const userId = req.user.id;

    if (!reason || !reasonUrl) {
      return res.sendStatus(400);
    }

    const report = await Report.create({
      reason,
      reasonUrl,
      user: userId,
    });

    await report.save();

    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

module.exports = router;
