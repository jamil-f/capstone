import AuthForm from "../components/AuthForm/AuthForm";

const Home = ({ auth, authAction, logout, businesses, users, reviews }) => {
  
  const isAuthenticated = auth?.id;
  console.log(users);

  // Ensure this logic is placed inside the function scope
  const recentUsers = users
    ? [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
    : [];

  
  // Calculate average rating for businesses
  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "No ratings yet";

    return (
      <div>
        <h1>Welcome to Acme Business Reviews</h1>
  
        <h2>Interesting Information:</h2>
        <p>There are {businesses.length} businesses currently listed.</p>
        {businesses.length > 0 && (
          <ul>
            {businesses.slice(0, 3).map((business) => (
              <li key={business.id}>
                <strong>{business.name}</strong> - Category: {business.category || "Video Game"}
                <br />
                Average Rating: {averageRating}
              </li>
            ))}
          </ul>
        )}
  
  <p>There are {users.length} users registered on the platform.</p>
      {users.length > 0 && (
        <ul>
          {recentUsers.map((user) => (
    <li key={user.id}>
      {user.username || 'Anonymous User'}
    </li>
  ))}
        </ul>
      )}

  
        <p>{reviews.length} reviews have been submitted.</p>
        {reviews.length > 0 && (
          <ul>
            {reviews.slice(0, 3).map((review) => (
              <li key={review.id}>
                {review.text} - Rated: {review.rating}/5
              </li>
            ))}
          </ul>
        )}
  
        {/* Use optional chaining to prevent null reference errors */}
        {!isAuthenticated ? (
          <>
            <AuthForm authAction={authAction} mode="login" />
            <AuthForm authAction={authAction} mode="register" />
          </>
        ) : (
          <button onClick={logout}>Logout</button> // Logout button for authenticated users
        )}
      </div>
    );
  };
  
  export default Home;