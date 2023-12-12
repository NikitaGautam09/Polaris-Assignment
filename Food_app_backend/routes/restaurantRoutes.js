// restaurantRoutes.js
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

router.post('/register', async (req, res) => {
  try {
    const { name, latitude, longitude, menu } = req.body;

    // Parse coordinates as numbers
    const coordinates = [parseFloat(longitude), parseFloat(latitude)];

    const restaurant = new Restaurant({
      name,
      location: {
        type: 'Point',
        coordinates,
      },
      menu,
    });

    // Save the restaurant to the database
    const savedRestaurant = await restaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// routes/restaurantRoutes.js


// Endpoint to get the list of all registered restaurants
router.get('/list', async (req, res) => {
  try {
    // Retrieve all restaurants from the database
    const restaurants = await Restaurant.find();

    res.status(200).json({ restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/cuisines', async (req, res) => {
  try {
    // Retrieve all distinct cuisines from the database
    const cuisines = await Restaurant.distinct('menu.itemName');

    res.status(200).json({ cuisines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


