import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Businesses = ({ businesses }) => {
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = businesses.filter((business) =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  }, [searchTerm, businesses]);

  return (
    <div>
      <h1>Businesses ({filteredBusinesses.length})</h1>
      <input
        type="text"
        placeholder="Search for a business..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
      <ul>
        {filteredBusinesses.map((business) => (
          <li key={business.id}>
            <strong>
              <Link to={`/businesses/${business.id}`}>{business.name}</Link>
            </strong>
            {' - '}Owned by {business.owner} (Established: {business.establishedyear})
            {' - '}Average Rating: {typeof business.average_rating === 'number' 
              ? business.average_rating.toFixed(1) 
              : 'No ratings yet'} / 10
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Businesses;