const express = require('express');
const {getTreatmentsByPatient, addTreatment} = require('../controllers/treatmentController');
const router = express.Router();

router.get("/patient/:id", getTreatmentsByPatient);
router.post("/", addTreatment);

module.exports = router;