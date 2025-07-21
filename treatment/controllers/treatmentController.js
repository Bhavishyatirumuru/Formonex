const Treatment = require('../models/treatment');
exports.getTreatmentsByPatient = async (req, res) => {
  const { id } = req.params;
  const treatments = await Treatment.find({ patientId: id }).sort({ date: -1 });
  res.json(treatments);
};
exports.addTreatment = async (req, res) => {
  try {
    const { patientId, date, procedures, roomStay, comments } = req.body;
    const procedureCost = (procedures||[]).reduce((sum, p) => sum + (Number(p.cost)||0), 0);
    let roomCost = 0;
    if (roomStay && roomStay.daysStayed && roomStay.perDayCost)
      roomCost = roomStay.daysStayed*roomStay.perDayCost;
    const totalAmount = procedureCost + roomCost;
    const newT = new Treatment({
      patientId, date, procedures, roomStay: roomStay || undefined, totalAmount, comments
    });
    const saved = await newT.save();
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json({error: "Treatment creation failed."});
  }
};