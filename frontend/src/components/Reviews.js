import React from 'react';  

const Reviews = () => {  
  // Sample static reviews for demonstration  
  const sampleReviews = [  
    { name: "John Doe", comment: "Amazing service! Highly recommended." },  
    { name: "Jane Smith", comment: "I had a great experience!" },  
  ];  

  return (  
    <div className="reviews">  
      <h1>Reviews and Ratings</h1>  
      <ul>  
        {sampleReviews.map((review, index) => (  
          <li key={index} className="review">  
            <strong>{review.name}</strong>: {review.comment}  
          </li>  
        ))}  
      </ul>  
      {/* Add functionality for adding new reviews */}  
    </div>  
  );  
};  

export default Reviews;