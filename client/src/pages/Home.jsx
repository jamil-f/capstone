import AuthForm from "../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";
import "./Home.css"
const Home = ({ auth, authAction, logout, businesses, users, reviews }) => {
  
  const isAuthenticated = auth?.id;

  const recentUsers = users
    ? [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
    : [];

  
  // Calculate average rating for businesses
  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "No ratings yet";

    return (
      <div className="home-container">
        <h1 className="welcome-title">Welcome to Big Head Game Reviews</h1>
  
        <section className="info-section">
          <h2>Platform Overview</h2>
          <p>
            We currently feature <strong>{businesses.length}</strong> businesses, 
            <strong> {users.length}</strong> users, and <strong>{reviews.length}</strong> reviews!
          </p>
        </section>
  
        <section className="highlight-section">
          <h2>Featured Businesses</h2>
          {businesses.length > 0 ? (
            <div className="business-cards">
              {businesses.slice(0, 3).map((business) => (
                <div key={business.id} className="business-card6">
                  <h3>{business.name}</h3>
                  <img
                    src={business.image_url}
                  />
                  <p>Release Year: {business.establishedyear}</p>
                  <p>Average Rating: {averageRating} / 5</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No businesses to display.</p>
          )}
        </section>
  
        <section className="users-section">
          <h2>Newest Users</h2>
          {users.length > 0 ? (
            <ul className="user-list">
              {recentUsers.map((user) => (
                <li key={user.id} className="user-item">
                  {user.username || "Anonymous User"}
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found.</p>
          )}
        </section>
  
        <section className="reviews-section">
  <h2>Recent Reviews</h2>
  {reviews.length > 0 ? (
    <ul className="review-list">
      {reviews.slice(0, 3).map((review) => (
        <li key={review.id} className="review-item">
          <p>
            <strong>{review.user_name}</strong> reviewed <strong>{review.business_name}</strong>
          </p>
          <p>
            "{review.review_text}" - Rated: {review.rating} / 5
          </p>
        </li>
      ))}
    </ul>
  ) : (
    <p>No reviews yet.</p>
  )}
</section>
  
        <section className="auth-section">
          {!isAuthenticated ? (
            <>
              <AuthForm authAction={authAction} mode="login" />
              <AuthForm authAction={authAction} mode="register" />
            </>
          ) : (
            <button onClick={logout} className="logout-button">Logout</button>
          )}
        </section>
      </div>
    );
  };
  
  export default Home;