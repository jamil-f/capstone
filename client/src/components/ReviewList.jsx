import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem'; // Individual review component

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');

    // Function to fetch reviews from the server
    const fetchReviews = async () => {
        try {
            const response = await axios.get('/api/reviews');
            setReviews(response.data);
        } catch (ex) {
            setError('Failed to fetch reviews');
        }
    };

    // Fetch reviews on component mount
    useEffect(() => {
        fetchReviews();
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div>
            <h2>Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <ReviewItem
                            key={review.id}
                            review={review}
                            refreshReviews={fetchReviews} // Pass the refresh function
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;