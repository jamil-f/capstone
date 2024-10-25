import React from 'react';
import axios from 'axios';

const ReviewItem = ({ review, user, fetchReviews }) => {
  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Review deleted successfully');
      if (typeof fetchReviews === 'function') {
        fetchReviews(); // Call the refresh function
      }
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };
  

  return (
    <div className="review-item">
      <h3>{review.business_name}</h3> {/* Display the business name */}
      <p>{review.review_text}</p>
      <p>Rating: {review.rating}/5</p>
      {user?.id === review.user_id && (
        <button onClick={() => handleDelete(review.id)}>Delete</button>
      )}
    </div>
  );
};

export default ReviewItem;