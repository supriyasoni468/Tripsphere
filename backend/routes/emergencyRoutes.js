const express = require('express');
const router = express.Router();
const Emergency = require('../models/Emergency');

router.get('/', async (req, res) => {
  try {
    const emergencies = await Emergency.find();
    res.json(emergencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const emergency = new Emergency(req.body);
  try {
    const newEmergency = await emergency.save();
    res.status(201).json(newEmergency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
