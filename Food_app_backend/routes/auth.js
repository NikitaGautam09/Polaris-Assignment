const router = require("express").Router();


const User = require("../models/user");

router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
  
      const user = new User({ username, email, password });
  
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // routes/userRoutes.js


// Endpoint for user login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isPasswordValid = await user.comparePassword(password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }

//     // Save user data in localStorage
//     const userData = {
//       _id: user._id,
//       email: user.email,
//       // Add other relevant user data as needed
//     };
//     localStorage.setItem('user', JSON.stringify(userData));

//     // Respond with success message or user data
//     res.status(200).json({ message: 'Login successful', user: userData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Assuming you have a User model and a login API endpoint

const jwt = require('jsonwebtoken');

// Endpoint to handle user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    // Respond with success message and token
    res.status(200).json({ message: 'Login successful', token,  user: {
      _id: user._id,
      email: user.email,
      username:user.username
      // Include other user details as needed
    }, });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;



