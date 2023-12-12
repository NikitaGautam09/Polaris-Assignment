import logo from './logo.svg';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import OrderPlacementForm from './components/OrderPlacementForm';
import RestaurantRegistration from './components/ResturantRegister';
import RiderRegistration from './components/RiderRegistration';
import RestaurantList from './components/RestaurantList';
import RiderOrderHistory from './components/RiderOrderCompleted';
import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  

 
  return (
    <div className="App">
      
      <Router>
      <Navigation />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/home" element={<RestaurantList />} />
          <Route path="/resturant/register" element={<RestaurantRegistration />} />
          <Route path="/rider/register" element={<RiderRegistration />} />

          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
