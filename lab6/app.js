const sequelize = require("./database/db");
require("./src/models");

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./src/routes/userRoutes");
const employerRoutes = require("./src/routes/employerRoutes");
const vacancyApiRoutes = require("./src/routes/api/vacancyApiRoutes");
const apiErrorHandler = require("./src/middlewares/apiErrorHandler");

app.use("/", userRoutes);
app.use("/", employerRoutes);
app.use("/api/vacancies", vacancyApiRoutes);

sequelize.authenticate()
  .then(() => {
    console.log("Sequelize connected");
  })
  .catch(err => {
    console.error("Sequelize connection error:", err);
  });

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Tables synced");
    app.use("/api", apiErrorHandler);
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch(err => {
    console.error("Sync error:", err);
  });
