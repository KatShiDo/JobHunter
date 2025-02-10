const router = require("express").Router();

const { ROLES } = require("@/constants");
const role = require("@/middleware/role");
const auth = require("@/middleware/auth");

const authRoutes = require("./auth");
const companyRoutes = require("./company");
const vacancyRoutes = require("./vacancy");
const adminRoutes = require("./admin/index");
const userRoutes = require("./user");
const responseRoutes = require("./response");
const reportRoutes = require("./report");
const contactRoutes = require("./contact");

router.use("/auth", authRoutes);
router.use("/company", auth, companyRoutes);
router.use("/vacancy", vacancyRoutes);
router.use("/admin", auth, role.check(ROLES.Admin), adminRoutes);
router.use("/user", auth, userRoutes);
router.use("/response", auth, responseRoutes);
router.use("/report", auth, reportRoutes);
router.use("/contact", auth, contactRoutes);

module.exports = router;
