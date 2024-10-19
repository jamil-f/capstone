const Businesses = ({ businesses }) => {
  return (
    <div>
      <h1>Businesses ({businesses.length})</h1>
      <ul>
        {businesses.map((business) => (
          <li key={business.id}>
            <strong>{business.name}</strong> - Owned by {business.owner} (Established: {business.establishedyear})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Businesses;