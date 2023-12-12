// Navigation.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; 
import axios from 'axios';
import RiderOrderHistory from './RiderOrderCompleted';

const Navigation = () => {
  const [suggestedCuisines, setSuggestedCuisines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [userID, setUserID] = useState();
  const [showOrderHistory,setShowOrderHistory]=useState(false)

  useEffect(() => {
    // Fetch suggested cuisines from the server when the component mounts
    
    fetchSuggestedCuisines();
  }, []);

  const fetchSuggestedCuisines = async () => {
    try {
      // Assuming you have the user ID stored in localStorage
      const userId = JSON.parse(localStorage.getItem('user')).user._id;
      setUserID(userId);

      // Fetch suggested cuisines based on the user ID
      const response = await axios.get(`http://localhost:8080/api/suggestions/suggest?userId=${userId}`);
      setSuggestedCuisines(response.data);
    } catch (error) {
      console.error('Error fetching suggested cuisines:', error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const handleDeliveryTimeChange = (e) => {
    const time = e.target.value;
    setDeliveryTime(time);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have the user ID stored in localStorage
      const userId = JSON.parse(localStorage.getItem('user')).user._id;

      // Hit the search API with the search parameters
      const response = await axios.get(`http://localhost:8080/api/suggestions/suggest`, {
        params: {
          userId,
          cuisine: searchQuery,
          deliveryTime,
        },
      });

      // Handle the response from the search API
      console.log('Search API response:', response.data);

      // Update the state with the search results
      setSearchResults(response.data);

      // Show the popup
      setShowPopup(true);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const handlePopupClose = () => {
    // Close the popup and reset the search results
    setShowPopup(false);
    setSearchResults([]);
  };

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const handleLogout = () => {
 
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Food Delivery </Link>
      </div>
      {userID?

      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for cuisine..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <ul className="suggested-cuisines">
          {suggestedCuisines.map((cuisine) => (
            <li key={cuisine} onClick={() => handleCuisineSelect(cuisine)}>
              {cuisine}
            </li>
          ))}
        </ul>
        <label>
          Delivery Time:
          <input
            type="text"
            placeholder="Enter delivery time..."
            value={deliveryTime}
            onChange={handleDeliveryTimeChange}
          />
        </label>
        <button type="submit">Search</button>
        
      </form>:''}

      {/* Popup */}
      {searchResults.length > 0 && showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Restaurants</h2>
            <ul>
              {searchResults.map((restaurant) => (
                <li key={restaurant._id}>{restaurant.name}</li>
              ))}
            </ul>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}

      <ul className="nav-links">
     
       <li>
          <Link to='/rider/register'>Register Yourself As a Rider |</Link>
        </li>
        <li>
          <Link to='/resturant/register'>Register Your Restaurant |</Link>
        </li>
        <li>{userID ? '' : <Link to="/login">Login |</Link>}</li>
        <li>{userID ? '' :<Link to="/register">Register</Link> }</li>

        {userID && (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
        
      </ul>
    </nav>
  );
};

export default Navigation;
