const express = require("express");
const router = express.Router();

const Report = require("@/models/report");

router.get("/", async (req, res) => {
  try {
    const reports = await Report.find();

    res.status(200).json(reports);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    const report = await Report.findByIdAndDelete(id);

    if (!report) {
      return res.sendStatus(404);
    }

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
