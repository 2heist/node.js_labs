const express = require('express');
const router = express.Router();
const vacancyApiController = require('../../controllers/api/vacancyApiController');

router.get('/', vacancyApiController.getAll);
router.get('/:id', vacancyApiController.getById);
router.delete('/:id', vacancyApiController.deleteVacancy);
