    const express = require('express');  
    const router = express.Router();  
    const User = require('../models/User'); // Import the User model  
    const bcrypt = require('bcryptjs'); // Import bcrypt for hashing  
    const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation  

    // User registration  
    router.post('/register', async (req, res) => {  
        const { username, email, password } = req.body;  
    
        // Check if the user already exists  
        const existingUser = await User.findOne({ email });  
        if (existingUser) {  
        return res.status(400).json({ message: 'User with that email already exists.' });  
        }  
    
        // Hash password  
        const hashedPassword = await bcrypt.hash(password, 10);  
        
        // Create user  
        const newUser = new User({ username, email, password: hashedPassword });  
        await newUser.save();  
        res.status(201).json({ message: 'User registered successfully.' });  
    });

    // User login  
    router.post('/login', async (req, res) => {  
    const { email, password } = req.body;  
    const user = await User.findOne({ email });  

    if (!user || !(await bcrypt.compare(password, user.password))) {  
        return res.status(401).json({ message: 'Invalid credentials' });  
    }  

    // Generate JWT  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);  
    res.json({ token });  
    });  

    module.exports = router; // Export the router for use in server.js