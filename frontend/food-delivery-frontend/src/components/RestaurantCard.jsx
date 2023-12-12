import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RestaurantCard.css';
import restImg from '../assets/restaurant-icon.png';

const RestaurantCard = ({ restaurant }) => {
  const [menu, setMenu] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [selectedMenuItemPrice, setSelectedMenuItemPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [userID, setUserID] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [nearestRider, setNearestRider] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));

    console.log('userrrr', userData.user._id);
    setUserID(userData.user._id);
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/menu/getMenu/${restaurant._id}`);
        setMenu(response.data || []);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, [restaurant._id]);

  const handleMenuItemChange = (event) => {
    const selectedItem = event.target.value;
    const selectedItemData = menu.find((item) => item.itemName === selectedItem);

    setSelectedMenuItem(selectedItem);
    setSelectedMenuItemPrice(selectedItemData ? selectedItemData.price : 0);
  };

  const handlePlaceOrder = async () => {
    try {
      // Perform the order placement logic here
      const response = await axios.post('http://localhost:8080/api/order/placeOrder', {
        userId: userID,
        restaurantId: restaurant._id,
        items: [{
          itemName: selectedMenuItem,
          quantity: quantity,
          price: selectedMenuItemPrice,
        }],
      });

      console.log('Order placed successfully:', response.data);

      // Fetch details about the nearest rider
      const riderResponse = await axios.get(`http://localhost:8080/api/rider/findNearestRider/${restaurant._id}`);
      setNearestRider(riderResponse.data);

      // Show the popup
      setShowPopup(true);
    } catch (error) {
      console.error('Error placing order:', error);

      // Handle the case where no rider is found nearby
      if (error.response && error.response.status === 404) {
        setPopupMessage('No rider found nearby. Please try again later.');
        setShowPopup(true);
        setNearestRider(null); // Reset nearest rider details
      }
    }
  };

  const handleAcceptOrder = async () => {
    try {
      // Perform the logic to accept the order
      const orderResponse = await axios.post('http://localhost:8080/api/order/acceptOrder', {
        orderId: nearestRider.orderId, // Use the actual order ID
        riderId: nearestRider._id, // Use the actual rider ID
      });

      console.log('Order accepted successfully:', orderResponse.data);
      // Close the popup after accepting the order
      setShowPopup(false);
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handlePopupClose = () => {
    // Close the popup and reset the nearest rider details
    setShowPopup(false);
    setNearestRider(null);
    setPopupMessage('');
  };

  return (
    <div className="restaurant-card">
      <img src={restImg} alt="Restaurant" />
      <h3>{restaurant.name}</h3>
      <label>
        Select Item:
        <select value={selectedMenuItem} onChange={handleMenuItemChange}>
          <option value="" disabled>Select Item</option>
          {menu.map((menuItem) => (
            <option key={menuItem._id} value={menuItem.itemName}>
              {menuItem.itemName}
            </option>
          ))}
        </select>
      </label>
      <div>
        <label>
          Price:
          <input
            type="text"
            value={selectedMenuItemPrice}
            readOnly
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
          />
        </label>
        <button type="button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>{popupMessage || 'Nearest Rider Details'}</h2>
            {nearestRider ? (
              <div>
                <p>Name: {nearestRider.name}</p>
                <p>Contact: {nearestRider.contactNumber}</p>
                {/* Add other rider details as needed */}
                <button onClick={handleAcceptOrder}>Accept Order</button>
              </div>
            ) : (
              <p>{popupMessage || 'No rider found nearby.'}</p>
            )}
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantCard;
