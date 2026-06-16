const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Police', 'Hospital', 'Fire', 'Ambulance', 'Embassy', 'Tourist Help']
  },
  phone: {
    type: String,
    required: true
  },
  address: String,
  city: {
    type: String,
    required: true
  },
  available24x7: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Emergency', emergencySchema);
