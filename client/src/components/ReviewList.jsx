import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem'; // This will be the individual review component

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('/api/reviews');
                setReviews(response.data);
            } catch (ex) {
                setError('Failed to fetch reviews');
            }
        };

        fetchReviews();
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div>
            <h2>Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;