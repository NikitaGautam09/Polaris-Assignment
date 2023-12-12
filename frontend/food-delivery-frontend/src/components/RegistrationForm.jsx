// RegistrationForm.js
import React, { useState } from 'react';
import './Registration.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful, you can redirect the user or show a success message
        console.log('User registered successfully');
      } else {
        // Registration failed, handle errors
        const errorData = await response.json();
        console.error('Registration failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }

    // Reset form data after registration
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
