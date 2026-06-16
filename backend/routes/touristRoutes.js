const express = require('express');
const router = express.Router();
const Tourist = require('../models/Tourist');

router.get('/', async (req, res) => {
  try {
    const tourists = await Tourist.find();
    res.json(tourists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const tourist = new Tourist(req.body);
  try {
    const newTourist = await tourist.save();
    res.status(201).json(newTourist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
