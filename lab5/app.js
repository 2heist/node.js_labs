const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); 

const userRoutes = require("./src/routes/userRoutes");
const employerRoutes = require("./src/routes/employerRoutes");

app.use("/", userRoutes);
app.use("/", employerRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});