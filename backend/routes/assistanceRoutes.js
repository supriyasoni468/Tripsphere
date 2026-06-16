const express = require('express');
const router = express.Router();
const AssistanceRequest = require('../models/AssistanceRequest');

router.get('/', async (req, res) => {
  try {
    const requests = await AssistanceRequest.find()
      .populate('touristId', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const request = new AssistanceRequest(req.body);
  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
