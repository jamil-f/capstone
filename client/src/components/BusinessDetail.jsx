import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BusinessDetail = () => {
  const { id } = useParams();  // This will get the business ID from the URL
  const [business, setBusiness] = useState(null);  // State to store business data
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true);    // Loading state
  const [error, setError] = useState(null);        // Error state
  
  useEffect(() => {
    // Fetch business details when the component mounts
    const fetchBusinessDetails = async () => {
      try {
        const response = await axios.get(`/api/businesses/${id}`);
        setBusiness(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load business details.');
        setLoading(false);
      }
    };
    
    fetchBusinessDetails();
  }, [id]);  // Dependency on business ID
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {business && (
        <>
          <h1>{business.name}</h1>
          <p>{business.description}</p>
          <p>Location: {business.location}</p>
          <p>Rating: {business.averageRating}</p>
          {/* You can add more details about the business as needed */}
        </>
      )}
    </div>
  );
};

export default BusinessDetail;