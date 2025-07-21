const express = require('express');
const router = express.Router();
const { addPatient, getPatients, deletePatient } = require('../controllers/patientController');
router.post('/', addPatient);
router.get('/', getPatients);
router.delete('/:id', deletePatient);
module.exports = router;