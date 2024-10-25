import React, { useState } from 'react';
import axios from 'axios';

const ReviewEdit = ({ review, fetchReviews, setIsEditing }) => {
    const [text, setText] = useState(review.review_text);
    const [rating, setRating] = useState(review.rating);

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/reviews/${review.id}`, { review_text: text, rating: rating });
            fetchReviews(); // Refresh reviews
            setIsEditing(false); // Exit edit mode
        } catch (ex) {
            console.error('Failed to update review:', ex);
        }
    };

    return (
        <div className="review-edit">
            <textarea
                value={text}
                onChange={(ev) => setText(ev.target.value)}
            />
            <input
                type="number"
                value={rating}
                onChange={(ev) => setRating(ev.target.value)}
                min="1"
                max="5"
            />
            <button onClick={handleUpdate}>Update Review</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
    );
};

export default ReviewEdit;