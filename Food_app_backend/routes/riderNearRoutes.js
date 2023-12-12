// routes/riderRoutes.js
const express = require('express');
const router = express.Router();
const Rider = require('../models/rider');
const Restaurant = require('../models/restaurant');

// Endpoint to find the nearest rider to a restaurant
router.get('/findNearestRider/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Find the restaurant by restaurantId
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Find the nearest rider based on the restaurant's location
    const nearestRider = await Rider.findOne({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: restaurant.location.coordinates,
          },
          $maxDistance: 10000, // Adjust the maximum distance as needed (in meters)
        },
      },
    });

    if (!nearestRider) {
      return res.status(404).json({ error: 'No rider found near the restaurant' });
    }

    // Respond with the nearest rider details
    res.status(200).json(nearestRider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
