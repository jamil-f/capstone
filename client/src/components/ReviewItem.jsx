import React from 'react';
import axios from 'axios';
import ReviewEdit from './ReviewEdit'; // Edit component

const ReviewItem = ({ review, refreshReviews }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/reviews/${review.id}`);
            alert('Review deleted successfully!');
            refreshReviews(); // Refresh the reviews list
        } catch (error) {
            console.error('Failed to delete review:', error);
            alert('Could not delete the review. Please try again.');
        }
    };
    console.log('Review ID:', review.id);

    return (
        <li>
          <h3>Business: {review.business_name}</h3>
          <p>Review: {review.review_text}</p>
          <p>Rating: {review.rating}</p>
          <button onClick={handleDelete}>Delete</button>
        </li>
      );
    };

export default ReviewItem;