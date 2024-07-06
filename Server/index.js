const express = require('express');
const cors = require('cors');
const port = 5000;
const dotenv=require('dotenv')
const app = express();
const mongoose = require('mongoose');

const authRoute=require('./routes/authRoute')
const categoryRoute=require('./routes/categoryRoute')
const productRoute=require('./routes/productRoute')
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/E_commerce')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
  app.use(express.json())

app.use(cors());

app.use('/api/v1/auth',authRoute) ;
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)

app.get('/', (req, res) => {
    
  res.send("Hello");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



