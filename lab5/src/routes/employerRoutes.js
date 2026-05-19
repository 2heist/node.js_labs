//старий шаблон з лаб 4

const express = require("express");
const router = express.Router();
const employerController = require("../controllers/employerController.js");

router.get("/admin", employerController.getAdminPanel);

router.get("/admin/create", employerController.getCreateVacancyForm);
router.post("/admin/create", employerController.createVacancy);

router.get("/admin/edit/:id", employerController.getEditVacancyForm);
router.post("/admin/edit/:id", employerController.updateVacancy);

router.get("/admin/delete/:id", employerController.deleteVacancy);

module.exports = router;
