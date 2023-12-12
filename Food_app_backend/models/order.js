// models/order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  items: [{
    itemName: String,
    quantity: Number,
    price: Number,
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rider',
    },
  }],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'delivered'],
    default: 'pending',
  },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
