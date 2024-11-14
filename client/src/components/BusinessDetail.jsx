import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BusinessListReviews from './BusinessListReviews';
import './BusinessDetail.css';

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
      <div className="business-detail-container">
        <div className="business-card2">
          <img
            src={business.image_url}
            alt={business.name}
            className="business-image"
          />
          <div className="business-info">
            <h1>{business.name}</h1>
            <p className="business-description">{business.description}</p>
            <p className="business-rating">Average Rating: {averageRating} / 5</p>
            <Link to="/businesses" className="back-button">
              ← Back to Games
            </Link>
          </div>
        </div>
        <BusinessListReviews businessId={id} />
      </div>
    );
  };

export default BusinessDetail;