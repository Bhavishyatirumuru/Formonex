const Patient = require('../models/patient');

exports.addPatient = async (req, res) => {
  const { name, age, gender, contact } = req.body;
  if (!name || !age || !gender || !contact) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const patient = new Patient({ name, age, gender, contact });
    await patient.save();
    res.status(201).json({ patient });
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json({ patients });
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Patient not found" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
};