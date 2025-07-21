const mongoose = require('mongoose');
const TreatmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  date: { type: Date, required: true },
  procedures: [{
    name: String,
    cost: Number,
  }],
  roomStay: {
    roomNo: String,
    bedNo: String,
    daysStayed: Number,
    perDayCost: Number,
  },
  totalAmount: Number,
  comments: String,
});
module.exports = mongoose.model('Treatment', TreatmentSchema);