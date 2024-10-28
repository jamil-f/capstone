import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Businesses.css';

const Businesses = ({ businesses }) => {
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = businesses.filter((business) =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  }, [searchTerm, businesses]);
  
  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return "No ratings yet";
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div className="businesses-container">
      <h1>Games ({filteredBusinesses.length})</h1>
      <input
        type="text"
        placeholder="Search for a game..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="business-grid">
        {filteredBusinesses.map((business) => (
          <div key={business.id} className="business-card">
            <img
              src={business.image_url}
              alt={`${business.name} image`}
              className="business-image3"
            />
            <div className="business-details">
              <h3>
                <Link to={`/businesses/${business.id}`}>{business.name}</Link>
              </h3>
              <p><strong>Owned by:</strong> {business.owner}</p>
              <p><strong>Release Year:</strong> {business.establishedYear}</p>
              <p><strong>Average Rating:</strong> {getAverageRating(business.reviews)} / 5</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default Businesses;