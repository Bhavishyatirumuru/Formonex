// Load environment variables from .env
require('dotenv').config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your Mongoose model
const Bill = require('./models/bill');

// Initialize Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// POST /api/bills - Add a new bill
app.post('/api/bills', async (req, res) => {
  console.log("Received bill data:", req.body); // Debug: log received data
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json({ message: 'Bill added', bill });
  } catch (err) {
    console.error("POST /api/bills error:", err);
    res.status(400).json({ error: err.message });
  }
});

// GET /api/bills - Retrieve all bills
app.get('/api/bills', async (req, res) => {
  try {
    const bills = await Bill.find().sort({ date: -1 });
    res.json(bills);
  } catch (err) {
    console.error("GET /api/bills error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bills/patient/:patientId
app.get('/api/bills/patient/:patientId', async (req, res) => {
  try {
    const bills = await Bill.find({ patientId: req.params.patientId }).sort({ date: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check route (optional, helpful for debugging)
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));