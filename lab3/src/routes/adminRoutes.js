const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController.js");

router.get("/admin", adminController.getAdminPanel);
router.post("/admin/game", adminController.createGame);
router.post("/admin/game/:id/result", adminController.updateResult);
router.post("/admin/game/:id/delete", adminController.deleteGame);

module.exports = router;
