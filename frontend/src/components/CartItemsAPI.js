import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartItemsAPI = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cart');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleRemoveFromCart = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/${id}`);
            fetchCartItems(); // Refresh cart
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    return (
        <div>
            <h2>Cart Items API</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item._id}>
                            <strong>{item.name}</strong>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ₹{item.price * item.quantity}</p>
                            <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartItemsAPI;
