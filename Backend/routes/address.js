const express = require('express');  
const { body, validationResult } = require('express-validator');  
const Address = require('../models/Address'); // Adjust the path as needed  

const router = express.Router();  

// POST route to add an address  
router.post('/',   
    [  
        body('address').notEmpty().withMessage('Address is required'),  
        body('city').notEmpty().withMessage('City is required'),  
        body('postalCode').isPostalCode('any').withMessage('Valid postal code is required'),  
        body('country').notEmpty().withMessage('Country is required'),  
    ],  
    async (req, res) => {  
        const errors = validationResult(req);  
        if (!errors.isEmpty()) {  
            return res.status(400).json({ errors: errors.array() });  
        }  

        const { address, city, postalCode, country } = req.body;  

        const newAddress = new Address({ address, city, postalCode, country });  

        try {  
            const savedAddress = await newAddress.save();  
            return res.status(201).json(savedAddress);  
        } catch (error) {  
            return res.status(500).json({ message: 'Error saving address: ' + error.message });  
        }  
    }  
);  

// GET route to retrieve all addresses  
router.get('/', async (req, res) => {  
    try {  
        const addresses = await Address.find();  
        res.status(200).json(addresses);  
    } catch (error) {  
        res.status(500).json({ message: 'Error retrieving addresses: ' + error.message });  
    }  
});  

module.exports = router;