const express = require("express");
const pool = require("./database/db");
//const repository = require("./src/repositories/testRepository");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/vacancies", (req, res) => {
  res.render("vacancies", { vacancies: [] });
});

app.get("/admin", (req, res) => {
  res.render("admin-panel", { vacancies: [] });
});

app.get("/vacancy/:id", (req, res) => {
  res.render("vacancy-details", { vacancy: null });
});

app.get("/search", (req, res) => {
  res.render("search-results", { vacancies: [] });
});

/*
app.get("/test-db", async (req, res) => {
    const vacancies = await repository.getAllVacancies();
    res.json(vacancies);

});
*/

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
