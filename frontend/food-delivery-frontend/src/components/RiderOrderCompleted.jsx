// RiderOrderHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RiderOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/order/riderOrderHistory/6575b0380b7039f6e15d919d`);
        setOrderHistory(response.data);
      } catch (error) {
        console.error('Error fetching rider order history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Rider Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No orders found in the history.</p>
      ) : (
        <ul>
          {orderHistory.map((order) => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Restaurant: {order.restaurant.name}</p>
              <p>Total Amount: ${order.totalAmount}</p>
              <p>Status: {order.status}</p>
              {/* Add more details or styling as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RiderOrderHistory;
