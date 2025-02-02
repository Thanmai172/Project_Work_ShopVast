require('dotenv').config();  
const express = require('express');  
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');  
const cors = require('cors');  

// Importing routes  
const userRoutes = require('./routes/user');  // User routes  
const jobRoutes = require('./routes/job');    // Job routes  
const addressRoutes = require('./routes/address'); // Address routes 
const cartRoutes = require('./routes/cartItems'); // Import cart routes
const paymentRoutes = require("./routes/payment");



const app = express();  
const PORT = process.env.PORT || 5000;  

// Middleware  
app.use(cors());  
app.use(bodyParser.json());   

// Database Connection  
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })  
  .then(() => console.log('MongoDB connected'))  
  .catch(err => console.error('MongoDB connection error:', err));  

// Routes  
app.use('/api/users', userRoutes); // User routes  
app.use('/api/jobs', jobRoutes);   // Job routes   
app.use('/api/addresses', addressRoutes); // Address routes  
app.use('/api/cart', cartRoutes); // Use cart routes
app.use("/api/payment", paymentRoutes);



// Start the server  
app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);  
});