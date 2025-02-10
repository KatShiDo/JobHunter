var express = require("express");
const router = express.Router();
const path = require("path");
const apiRoutes = require("./api");

const keys = require("@/config/keys");
const { apiURL } = keys.app;

const api = `/${apiURL}`;

router.use("/uploads", express.static(path.resolve(__dirname, "../uploads/")));

router.use(api, apiRoutes);
router.use(api, (req, res) => res.status(404).json("API route not found"));

router.use(express.static(path.join(__dirname, "../public")));

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

module.exports = router;
