const Patient = require('../models/patient');
exports.getAllPatients = async (req, res) => {
  const search = req.query.search || '';
  const patients = await Patient.find({ name: { $regex: search, $options: 'i' } });
  res.json(patients);
};
exports.addPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (e) {
    res.status(400).json({error: 'Patient creation failed.'});
  }
};