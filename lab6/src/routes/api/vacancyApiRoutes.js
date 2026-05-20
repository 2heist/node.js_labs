const express = require("express");
const router = express.Router();
const vacancyApiController = require("../../controllers/api/vacancyApiController");

router.get("/", vacancyApiController.getAll);
router.get("/:id", vacancyApiController.getById);
router.delete("/:id", vacancyApiController.deleteVacancy);

router.post("/", vacancyApiController.createVacancy);
router.put("/:id", vacancyApiController.updateVacancy);

module.exports = router;
