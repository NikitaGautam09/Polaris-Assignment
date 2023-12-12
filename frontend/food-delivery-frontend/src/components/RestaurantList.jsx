// RestaurantList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ onPlaceOrder, userId }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/restaurant/list');
        // Assuming the response is an object with a 'restaurants' property
        setRestaurants(response.data.restaurants || []);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const fetchOrderHistory = async () => {
    try {
        const userId = JSON.parse(localStorage.getItem('user')).user._id;
      const response = await axios.get(`http://localhost:8080/api/order/userOrderHistory/${userId}`);
      setOrderHistory(response.data || []);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  const handleShowOrderHistory = () => {
    fetchOrderHistory();
    setShowOrderHistory(true);
  };

  const handleOrderHistoryClose = () => {
    setShowOrderHistory(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant._id} restaurant={restaurant} onPlaceOrder={onPlaceOrder} />
      ))}
      </div>
      <button onClick={handleShowOrderHistory}>Order History</button>

      {/* Order History Popup */}
      {showOrderHistory && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Order History</h2>
            {orderHistory.length > 0 ? (
              <ul>
                {orderHistory.map((order) => (
                  <li key={order._id}>
                    {order.items.map((item) => (
                      <p key={item._id}>{item.itemName} - Quantity: {item.quantity} - Price: {item.price}</p>
                    ))}
                    <p>Total Amount: {order.totalAmount}</p>
                    <p>Status: {order.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No order history found.</p>
            )}
            <button onClick={handleOrderHistoryClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
