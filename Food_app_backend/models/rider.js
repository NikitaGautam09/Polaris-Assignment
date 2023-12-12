// models/rider.js
const mongoose = require('mongoose');

const RiderSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
});

RiderSchema.index({ location: '2dsphere' });

const Rider = mongoose.model('Rider', RiderSchema);

module.exports = Rider;
