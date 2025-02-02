import React from 'react';  

const CartControls = ({ item, category, mobileCart, laptopCart, setMobileCart, setLaptopCart }) => {  
    const handleAddToCart = () => {  
        if (category === 'mobile') {  
            setMobileCart((prev) => ({  
                ...prev,  
                [item.id]: (prev[item.id] || 0) + 1,  
            }));  
        } else {  
            setLaptopCart((prev) => ({  
                ...prev,  
                [item.id]: (prev[item.id] || 0) + 1,  
            }));  
        }  
    };  

    const handleRemoveFromCart = () => {  
        if (category === 'mobile') {  
            setMobileCart((prev) => {  
                const newQuantity = (prev[item.id] || 0) - 1;  
                return newQuantity <= 0 ? { ...prev, [item.id]: undefined } : { ...prev, [item.id]: newQuantity };  
            });  
        } else {  
            setLaptopCart((prev) => {  
                const newQuantity = (prev[item.id] || 0) - 1;  
                return newQuantity <= 0 ? { ...prev, [item.id]: undefined } : { ...prev, [item.id]: newQuantity };  
            });  
        }  
    };  

    return (  
        <div style={{ display: 'flex', alignItems: 'center' }}>  
            <button onClick={handleRemoveFromCart}>-</button>  
            <span style={{ margin: '0 10px' }}>{category === 'mobile' ? mobileCart[item.id] || 0 : laptopCart[item.id] || 0}</span>  
            <button onClick={handleAddToCart}>+</button>  
        </div>  
    );  
};  

export default CartControls;