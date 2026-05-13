const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/", userController.getHome);
router.get("/vacancies", userController.getVacancies);
router.get("/search", userController.searchVacancies);
router.get("/vacancies/:id", userController.getVacancyDetails);

module.exports = router;
