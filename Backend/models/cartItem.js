const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    category: String,
});

module.exports = mongoose.model('CartItem', CartItemSchema);
