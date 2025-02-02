const express = require('express');
const CartItem = require('../models/cartItem'); // Create a model for cart items
const router = express.Router();

// Add item to cart
router.post('/', async (req, res) => {
    const { name, price, quantity, category } = req.body;

    try {
        const newItem = new CartItem({ name, price, quantity, category });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart: ' + error.message });
    }
});

// Get all cart items
router.get('/', async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart items: ' + error.message });
    }
});

// Remove item from cart
router.delete('/:id', async (req, res) => {
    try {
        await CartItem.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item: ' + error.message });
    }
});

module.exports = router;
