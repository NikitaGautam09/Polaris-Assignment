// routes/riderRoutes.js
const express = require('express');
const router = express.Router();
const Rider = require('../models/rider');

// Endpoint for rider registration
router.post('/register', async (req, res) => {
  try {
    const { name, contactNumber, location } = req.body;

    // Ensure that location coordinates are valid numbers
    const latitude = parseFloat(location.latitude);
    const longitude = parseFloat(location.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Invalid coordinates' });
    }

    // Update location with valid coordinates
    const updatedLocation = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const rider = new Rider({
      name,
      contactNumber,
      location: updatedLocation,
    });

    // Save rider to the database
    await rider.save();

    res.status(201).json({ message: 'Rider registered successfully', rider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
