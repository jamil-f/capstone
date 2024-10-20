import { Link } from 'react-router-dom';

const Businesses = ({ businesses }) => {
  return (
    <div>
      <h1>Businesses ({businesses.length})</h1>
      <ul>
        {businesses.map((business) => (
          <li key={business.id}>
            <strong>
              <Link to={`/businesses/${business.id}`}>
                {business.name}
              </Link>
            </strong> 
            - Owned by {business.owner} (Established: {business.establishedyear})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Businesses;