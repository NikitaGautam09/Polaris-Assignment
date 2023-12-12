const express = require("express");


const app = express();


const mongoose = require("mongoose");


const dotenv = require("dotenv");


const helmet = require("helmet");


const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path")
const bodyParser = require('body-parser');
app.use(bodyParser.json());

dotenv.config();
app.use(cors());

const authRoute = require("./routes/auth");
const riderRoutes = require('./routes/riderRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const riderNearRoutes = require('./routes/riderNearRoutes')


mongoose.connect('mongodb+srv://nikitagautampankaj:Polaris%401234@cluster0.yr2ycvn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

  app.use('/api/user',authRoute);
  app.use('/api/rider', riderRoutes);
  app.use('/api/restaurant', restaurantRoutes);
  app.use('/api/suggestions', suggestionRoutes);
  app.use('/api/menu', menuRoutes);
  app.use('/api/order', orderRoutes);
  app.use('/api/rider',riderNearRoutes)
  

app.listen(8080,()=>{


    console.log('backend running');


})