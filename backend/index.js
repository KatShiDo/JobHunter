require("module-alias/register");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
const cookieParser = require("cookie-parser");

const keys = require("@/config/keys");
const routes = require("@/routes");
const setupDB = require("@/utils/db");

const { port } = keys;
const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: keys.app.clientURL,
    credentials: true,
  })
);

setupDB();
require("@/config/passport")(app);
app.use(routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
