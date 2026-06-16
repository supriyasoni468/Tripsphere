const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
require('dotenv').config();

// Import routes
const touristRoutes = require('./routes/touristRoutes');
const businessRoutes = require('./routes/businessRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');
const assistanceRoutes = require('./routes/assistanceRoutes');

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/tourists', touristRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/assistance', assistanceRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Tourism Platform API',
    version: '1.0.0',
    endpoints: {
      tourists: '/api/tourists',
      businesses: '/api/businesses',
      emergency: '/api/emergency',
      assistance: '/api/assistance'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` API available at http://localhost:${PORT}`);
});
