// RestaurantRegistration.js
import React, { useState } from 'react';
import axios from 'axios';
import './ResturantRegister.css';

const RestaurantRegistration = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: '',
    latitude: '',
    longitude: '',
    menu: [{ itemName: '', price: 0 }],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'itemName' || name === 'price') {
      // Update menu item
      const updatedMenu = [...restaurantData.menu];
      updatedMenu[index][name] = value;
      setRestaurantData({ ...restaurantData, menu: updatedMenu });
    } else {
      // Update other fields
      setRestaurantData({ ...restaurantData, [name]: value });
    }
  };

  const handleAddMenuItem = () => {
    // Add a new menu item to the menu array
    setRestaurantData({
      ...restaurantData,
      menu: [...restaurantData.menu, { itemName: '', price: 0 }],
    });
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setRestaurantData({
            ...restaurantData,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure latitude and longitude are valid numbers
    const latitude = parseFloat(restaurantData.latitude);
    const longitude = parseFloat(restaurantData.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      console.error('Invalid coordinates');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/restaurant/register', restaurantData);

      console.log('Restaurant registered successfully:', response.data);
      // You may want to redirect or perform other actions upon successful registration
    } catch (error) {
      console.error('Error registering restaurant:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register Your Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Restaurant Name:
          <input type="text" name="name" value={restaurantData.name} onChange={(e) => handleChange(e)} required />
        </label>

        <label>
          Latitude:
          <input type="number" name="latitude" value={restaurantData.latitude} onChange={(e) => handleChange(e)} required />
          
        </label>

        <label>
          Longitude:
          <input type="number" name="longitude" value={restaurantData.longitude} onChange={(e) => handleChange(e)} required />
        </label>

        <h3>Menu</h3>
        {restaurantData.menu.map((menuItem, index) => (
          <div key={index}>
            <label>
              Item Name:
              <input
                type="text"
                name={`itemName`}
                value={menuItem.itemName}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </label>

            <label>
              Price:
              <input
                type="number"
                name={`price`}
                value={menuItem.price}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </label>
          </div>
        ))}

        <button type="button" onClick={handleAddMenuItem}>
          Add Menu Item
        </button>
        <button type="button" onClick={handleLocateMe}>
            Locate Me
          </button>
        <button type="submit">Register Restaurant</button>
      </form>
    </div>
  );
};

export default RestaurantRegistration;
