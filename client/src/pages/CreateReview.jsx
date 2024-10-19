// CreateReview.jsx
import { useState, useEffect } from 'react';

const CreateReview = ({ businessId, userId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState('');
  const [existingReview, setExistingReview] = useState(null);

  // useEffect(() => {
  //   const fetchExistingReview = async () => {
  //     const response = await fetch(`/api/reviews/${businessId}/${userId}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setExistingReview(data);
  //     }
  //   };

  //   fetchExistingReview();
  // }, [businessId, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingReview) {
      setError("You've already submitted a review for this item.");
      return;
    }

    const response = await fetch(`/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: reviewText, rating, businessId, userId }),
    });

    if (response.ok) {
      // Handle success (e.g., redirect or update UI)
    } else {
      setError('Failed to submit the review.');
    }
  };

  return (
    <div>
      <h2>Create Review</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          required
        />
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default CreateReview;