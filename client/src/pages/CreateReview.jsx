import { useState, useEffect } from 'react';
import axios from 'axios';

const CreateReview = ({ userId }) => {
  const [businesses, setBusinesses] = useState([]); // State for storing businesses
  const [selectedBusiness, setSelectedBusiness] = useState(''); // State for selected business
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState('');
  const [existingReview, setExistingReview] = useState(null);

  // Fetch businesses from server when component mounts
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('/api/businesses'); // Adjust the endpoint if necessary
        if (response.ok) {
          const data = await response.json();
          setBusinesses(data); // Store the businesses in state
        } else {
          console.error('Failed to fetch businesses');
        }
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };
    
    fetchBusinesses();
  }, []);

  // Handle the review submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingReview) {
      setError("You've already submitted a review for this item.");
      return;
    }
  
    if (!selectedBusiness) {
      setError('Please select a business to review.');
      return;
    }
  
    try {
      const response = await axios.post('/api/reviews', {
        text: reviewText,
        rating,
        businessId: selectedBusiness, // Send selected business ID
        userId,
      });
  
      if (response.status === 201) {
        // Handle success (e.g., redirect or update UI)
        console.log('Review submitted successfully');
      } else {
        setError('Failed to submit the review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit the review.');
    }
  };

  return (
    <div>
      <h2>Create Review</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        
        {/* Dropdown for selecting a business */}
        <label htmlFor="business">Select a business:</label>
        <select
          id="business"
          value={selectedBusiness}
          onChange={(e) => setSelectedBusiness(e.target.value)} // Update selected business
          required
        >
          <option value="">-- Choose a business --</option>
          {businesses.map((business) => (
            <option key={business.id} value={business.id}>
              {business.name}
            </option>
          ))}
        </select>
        
        {/* Review text area */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          required
        />
        
        {/* Rating selection */}
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