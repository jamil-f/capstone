import React, { useState } from 'react';
import axios from 'axios';
import ReviewEdit from './ReviewEdit'; // Import the ReviewEdit component

const ReviewItem = ({ review, user, fetchReviews }) => {
    const [isEditing, setIsEditing] = useState(false); // Track edit mode

    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(`/api/reviews/${reviewId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            alert('Review deleted successfully');
            if (typeof fetchReviews === 'function') {
                fetchReviews(); // Refresh the reviews list
            }
        } catch (error) {
            console.error('Failed to delete review:', error);
        }
    };

    const handleEditClick = () => setIsEditing(true); // Switch to edit mode
    const handleCancelEdit = () => setIsEditing(false); // Cancel edit mode

  

    return (
        <div className="review-item">
            {isEditing ? (
                <ReviewEdit
                    review={review}
                    fetchReviews={fetchReviews}
                    setIsEditing={setIsEditing} // Exit edit mode
                />
            ) : (
                <>
                    <h3>{review.business_name}</h3> {/* Display business name */}
                    <p>{review.review_text}</p>
                    <p>Rating: {review.rating}/5</p>
                    {user?.id === review.user_id && (
                        <>
                            <button onClick={handleEditClick}>Edit</button>
                            <button onClick={() => handleDelete(review.id)}>Delete</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ReviewItem;