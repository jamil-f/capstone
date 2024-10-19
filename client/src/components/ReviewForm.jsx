import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ itemId, onReviewSubmitted }) => {
    const [text, setText] = useState('');
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            await axios.post('/api/reviews', { text, score, itemId });
            onReviewSubmitted(); // Call the callback to refresh reviews
            setText('');
            setScore(0);
        } catch (ex) {
            setError('Failed to submit review');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <textarea
                value={text}
                onChange={(ev) => setText(ev.target.value)}
                placeholder="Write your review here"
                required
            />
            <input
                type="number"
                value={score}
                onChange={(ev) => setScore(ev.target.value)}
                placeholder="Score"
                min="1"
                max="5"
                required
            />
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;