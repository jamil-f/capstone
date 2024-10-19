import React, { useState } from 'react';
import axios from 'axios';

const ReviewEdit = ({ review }) => {
    const [text, setText] = useState(review.text);
    const [score, setScore] = useState(review.score);
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/reviews/${review.id}`, { text, score });
            setIsEditing(false); // Exit editing mode
        } catch (ex) {
            console.error('Failed to update review');
        }
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <textarea
                        value={text}
                        onChange={(ev) => setText(ev.target.value)}
                    />
                    <input
                        type="number"
                        value={score}
                        onChange={(ev) => setScore(ev.target.value)}
                        min="1"
                        max="5"
                    />
                    <button onClick={handleUpdate}>Update Review</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <p>{review.text}</p>
                    <p>Rating: {review.score}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </div>
    );
};

export default ReviewEdit;