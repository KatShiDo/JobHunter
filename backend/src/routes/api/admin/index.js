const router = require("express").Router();

const infoRoutes = require("./info");
const userRoutes = require("./user");
const reportRoutes = require("./report");

router.use("/info", infoRoutes);
router.use("/user", userRoutes);
router.use("/report", reportRoutes);

module.exports = router;
