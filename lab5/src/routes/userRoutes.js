//старий шаблон з лаб 4

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/", userController.getHomePage);
router.get("/vacancies", userController.getVacancies);
router.get("/search", userController.searchVacancies);
router.get("/vacancies/:id", userController.getVacancyDetails);

module.exports = router;
