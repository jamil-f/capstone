import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Send search term to the parent
  };

  return (
    <input
      type="text"
      placeholder="Search for a business..."
      value={searchTerm}
      onChange={handleChange}
      style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
    />
  );
};

export default SearchBar;