import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewComments from './ReviewComments'; 

const BusinessListReviews = ({ businessId, currentUserId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/by-business?businessId=${businessId}`);
        console.log('Fetched reviews:', response.data);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [businessId]);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
            <p><strong>Reviewed by:</strong> {review.username || 'Anonymous'}</p>
            <p><strong>Text:</strong> {review.review_text}</p>
            <p><strong>Rating:</strong> {review.rating} / 5</p>

            <ReviewComments reviewId={review.id} currentUserId={currentUserId} />
          </div>
        ))
      ) : (
        <p>No reviews available for this business.</p>
      )}
    </div>
  );
};

export default BusinessListReviews;