const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  clinicId: { type: String, required: true }
});
module.exports = mongoose.model('Patient', PatientSchema);