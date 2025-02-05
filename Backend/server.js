require('dotenv').config();  
const express = require('express');  
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');  
const cors = require('cors');  

// Importing routes  
const userRoutes = require('./routes/user');  // User routes  
const addressRoutes = require('./routes/address'); // Address routes 
const cartRoutes = require('./routes/cartItems'); // Import cart routes
const paymentRoutes = require("./routes/payment");
const employeeRoutes = require("./routes/employeeRoutes"); // Employee routes
const freelancerRoutes = require("./routes/freelancerRoutes"); // Freelancer routes



const app = express();  
const PORT = process.env.PORT || 5000;  

// Middleware  
app.use(cors());  
app.use(bodyParser.json());  
app.use("/uploads", express.static("uploads")); // Serve uploaded files


// Database Connection  
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })  
  .then(() => console.log('MongoDB connected'))  
  .catch(err => console.error('MongoDB connection error:', err));  

// Routes  
app.use('/api/users', userRoutes); // User routes  
app.use('/api/addresses', addressRoutes); // Address routes  
app.use('/api/cart', cartRoutes); // Use cart routes
app.use("/api/payment", paymentRoutes);
app.use("/api/employees", employeeRoutes); // Employee applications
app.use("/api/freelancers", freelancerRoutes); // Freelancer applications



// Start the server  
app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);  
});