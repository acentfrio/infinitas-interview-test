const cors = require("cors");
const express = require("express");
const teacherRoutes = require("./teacherRoutes");
const studentRoutes = require("./studentRoutes");
const assignmentRoutes = require("./assignmentRoutes");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

teacherRoutes(app);
studentRoutes(app);
assignmentRoutes(app);

module.exports = app;
