const express = require("express");
const router = express.Router();
const employerController = require("../controllers/employerController.js");

router.get("/admin", employerController.getAdminPanel);

router.get("/admin/create", employerController.getCreateForm);
router.post("/admin/create", employerController.createVacancy);

router.get("/admin/edit/:id", employerController.getEditForm);
router.post("/admin/edit/:id", employerController.updateVacancy);

router.get("/admin/delete/:id", employerController.deleteVacancy);

module.exports = router;
