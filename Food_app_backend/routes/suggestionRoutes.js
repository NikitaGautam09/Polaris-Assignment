// routes/suggestionRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Restaurant = require('../models/restaurant');

// Endpoint to suggest restaurants to a user
router.get('/suggest', async (req, res) => {
  try {
    const { userId, cuisine, deliveryTime } = req.query;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Query restaurants based on user preferences (e.g., cuisine and delivery time)
    const suggestedRestaurants = await Restaurant.find({
      'menu.itemName': cuisine,
      // You can add more criteria based on user preferences or restaurant availability
    });

    // Respond with the list of suggested restaurants
    res.status(200).json(suggestedRestaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
