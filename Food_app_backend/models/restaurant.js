// models/restaurant.js
const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
  menu: [{ itemName: String, price: Number }],
});

RestaurantSchema.index({ location: '2dsphere' });

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
