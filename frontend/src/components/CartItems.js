import React from 'react';
import axios from 'axios';

const CartItems = ({ mobileCart, laptopCart, clothingCart, mobileListings, laptopListings, clothingListings, handleRemoveFromMobileCart, handleRemoveFromLaptopCart, handleRemoveFromClothingCart }) => {
    
    const getCartItems = () => {
        const cartItems = [];

        // Adding mobile items
        for (const [id, quantity] of Object.entries(mobileCart)) {
            const item = mobileListings.find(item => item.id === Number(id));
            if (item) {
                cartItems.push({ ...item, quantity, category: 'mobile' });
            }
        }

        // Adding laptop items
        for (const [id, quantity] of Object.entries(laptopCart)) {
            const item = laptopListings.find(item => item.id === Number(id));
            if (item) {
                cartItems.push({ ...item, quantity, category: 'laptop' });
            }
        }

        // Adding clothing items
        for (const [id, quantity] of Object.entries(clothingCart)) {
            const item = clothingListings.find(item => item.id === Number(id));
            if (item) {
                cartItems.push({ ...item, quantity, category: 'clothing' });
            }
        }

        return cartItems;
    };

    // Function to save cart items to the backend
    const saveCartToBackend = async () => {
        const cartItems = getCartItems();
        
        for (const item of cartItems) {
            try {
                await axios.post('http://localhost:5000/api/cart', {
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    category: item.category
                });
            } catch (error) {
                console.error('Error saving item to cart:', error);
            }
        }
        alert('Cart items saved successfully!');
    };

    return (
        <div>
            <h2>Cart Items</h2>
            {getCartItems().length > 0 ? (
                <ul>
                    {getCartItems().map((item) => (
                        <li key={item.id}>
                            <strong>{item.name}</strong>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ₹{item.price * item.quantity}</p>
                            <button onClick={() => {
                                if (item.category === 'mobile') {
                                    handleRemoveFromMobileCart(item.id);
                                } else if (item.category === 'laptop') {
                                    handleRemoveFromLaptopCart(item.id);
                                } else {
                                    handleRemoveFromClothingCart(item.id);
                                }
                            }}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
            
            {/* Button to Save Cart Items */}
            <button onClick={saveCartToBackend}>Save Cart</button>
        </div>
    );
};

export default CartItems;
