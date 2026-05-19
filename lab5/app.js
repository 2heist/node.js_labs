const sequelize = require("./database/db");
require("./src/models");

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./src/routes/userRoutes");
const employerRoutes = require("./src/routes/employerRoutes");

app.use("/", userRoutes);
app.use("/", employerRoutes);

// перевірка підключення
sequelize.authenticate()
  .then(() => {
    console.log("Sequelize connected");
  })
  .catch(err => {
    console.error("Sequelize connection error:", err);
  });

// sync таблиць
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Tables synced");

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch(err => {
    console.error("Sync error:", err);
  });