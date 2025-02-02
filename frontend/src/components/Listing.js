import React from 'react';  
import CartControls from './CartControls';  

const Listing = ({ item, category, mobileCart, laptopCart, setMobileCart, setLaptopCart }) => {  
    return (  
        <li>  
            <strong>{item.name}</strong>  
            <p>Description: {item.description}</p>  
            <p>Pricing: <span>{`₹${item.price}`}</span></p>  
            <img src={item.image} alt={item.name} width="200" />  
            <h4>Reviews:</h4>  
            <ul>  
                {item.reviews.map((review, idx) => (  
                    <li key={idx}>  
                        <strong>{review.name}</strong>: {review.comment}  
                    </li>  
                ))}  
            </ul>  
            <CartControls  
                item={item}  
                category={category}  
                mobileCart={mobileCart}  
                laptopCart={laptopCart}  
                setMobileCart={setMobileCart}  
                setLaptopCart={setLaptopCart}  
            />  
        </li>  
    );  
};  

export default Listing;