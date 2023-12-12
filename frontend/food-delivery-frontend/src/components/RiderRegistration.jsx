// RiderRegistration.js
import React, { useState } from 'react';
import axios from 'axios';
import './RiderRegistration.css';

const RiderRegistration = () => {
  const [riderData, setRiderData] = useState({
    name: '',
    contactNumber: '',
    location: {
      latitude: '',
      longitude: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'latitude' || name === 'longitude') {
      // Update location coordinates
      setRiderData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [name]: parseFloat(value) || null, // Ensure it's a valid number or null
        },
      }));
    } else {
      // Update other fields
      setRiderData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleLocateMe = () => {
    // Use the Geolocation API to get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setRiderData((prevData) => ({
          ...prevData,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }));
      },
      (error) => {
        console.error('Error getting location:', error.message);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/rider/register', riderData);

      console.log('Rider registered successfully:', response.data);
      // You may want to redirect or perform other actions upon successful registration
    } catch (error) {
      console.error('Error registering rider:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register as a Rider</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={riderData.name} onChange={handleChange} required />
        </label>

        <label>
          Contact Number:
          <input type="text" name="contactNumber" value={riderData.contactNumber} onChange={handleChange} required />
        </label>

        <label>
          Latitude:
          <input type="number" name="latitude" value={riderData.location.latitude} onChange={handleChange} required />
        </label>

        <label>
          Longitude:
          <input type="number" name="longitude" value={riderData.location.longitude} onChange={handleChange} required />
        </label>

        <button type="button" onClick={handleLocateMe}>
          Locate Me
        </button>

        <button type="submit">Register Rider</button>
      </form>
    </div>
  );
};

export default RiderRegistration;
