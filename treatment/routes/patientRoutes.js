const express = require('express');
const {getAllPatients, addPatient} = require('../controllers/patientController');
const router = express.Router();

router.get("/", getAllPatients);
router.post("/", addPatient);

module.exports = router;