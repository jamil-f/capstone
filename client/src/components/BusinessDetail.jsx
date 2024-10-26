import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BusinessListReviews from './BusinessListReviews';

const BusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const averageRating = business.reviews.length
    ? (
        business.reviews.reduce((sum, review) => sum + review.rating, 0) / 
        business.reviews.length
      ).toFixed(1)
    : "No ratings yet";

    return (
      <div className="business-detail">
        {business && (
          <>
            <h1>{business.name}</h1>
            <img
              src={business.image_url}
              alt={`${business.name}`}
              style={{ width: '300px' }}
            />
            <p>{business.description}</p>
            <p>Rating: {averageRating} / 5</p>
  
            {/* Use BusinessListReviews component here */}
            <BusinessListReviews businessId={id} />
          </>
        )}
      </div>
    );
  };

export default BusinessDetail;