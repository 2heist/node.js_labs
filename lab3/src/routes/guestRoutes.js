const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guestController.js");

router.get("/schedule", guestController.getSchedule);
router.get("/search", guestController.searchTeam);

module.exports = router;
