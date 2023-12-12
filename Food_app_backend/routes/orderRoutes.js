// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Endpoint for placing an order
router.post('/placeOrder', async (req, res) => {
  try {
    const { userId, restaurantId, items } = req.body;

    // Assume that items is an array of objects with itemName, quantity, and price
    const totalAmount = items.reduce((total, item) => total + item.quantity * item.price, 0);

    // Create a new order
    const order = new Order({
      user: userId,
      restaurant: restaurantId,
      items,
      totalAmount,
    });

    // Save the order to the database
    await order.save();

    // Respond with success message and order details
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.post('/acceptOrder', async (req, res) => {
    try {
      const { orderId, riderId } = req.body;
  
      // Find the order by orderId
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Check if the order is pending
      if (order.status !== 'pending') {
        return res.status(400).json({ error: 'Order cannot be accepted. It is not in a pending state.' });
      }
  
      // Update the order with the rider's ID
      order.items.forEach(item => {
        item.rider = riderId;
      });
  
      // Update the order status to accepted
      order.status = 'accepted';
      await order.save();
  
      // Respond with success message
      res.status(200).json({ message: 'Order accepted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


router.get('/userOrderHistory/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      const userOrders = await Order.find({ user: userId }).sort({ createdAt: -1 });
  
      res.status(200).json(userOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.get('/riderOrderHistory/:riderId', async (req, res) => {
    try {
      const { riderId } = req.params;
  
      const riderCompletedOrders = await Order.find({
        status: 'delivered',
        'items.rider': riderId,
      }).sort({ createdAt: -1 });
  
      res.status(200).json(riderCompletedOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
module.exports = router;
