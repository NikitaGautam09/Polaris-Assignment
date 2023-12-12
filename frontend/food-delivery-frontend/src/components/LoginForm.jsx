// LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'; // Import your login page CSS

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Login successful, store user data in localStorage
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));

        const printData = JSON.parse(localStorage.getItem('user'));

        // Redirect the user or perform other actions
        console.log('Login successful',printData);
        window.location.href = '/home';
      } else {
        // Login failed, handle errors
        const errorData = await response.json();
        console.error('Login failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

    // Reset form data after login
    setFormData({ email: '', password: '' });
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
