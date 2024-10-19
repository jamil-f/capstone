import React from 'react';
import ReviewEdit from './ReviewEdit'; // This will be the edit component

const ReviewItem = ({ review }) => {
    const handleDelete = async () => {
        // Add delete logic here, using axios to call the DELETE endpoint
    };

    return (
        <li>
            <p>{review.text}</p>
            <p>Rating: {review.score}</p>
            <ReviewEdit review={review} /> {/* Include the edit component */}
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default ReviewItem;