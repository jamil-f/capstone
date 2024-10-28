import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReviewItem from "./ReviewItem";
import "./UserDetail.css";

const UserDetail = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchUserDetails();
    fetchUserReviews();
  }, [id]);

  const fetchUserDetails = async () => {
    const response = await fetch(`/api/users/${id}`); // Fetch user details
    const json = await response.json();
    if (response.ok) {
      setUser(json);
    }
  };

  const fetchUserReviews = async () => {
    const response = await fetch(`/api/reviews/user/${id}`); // Fetch user reviews
    const json = await response.json();
    if (response.ok) {
      setReviews(json);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-detail-container">
      <div className="user-card">
        <h1 className="user-name">{user.username}</h1>
        <Link to="/users" className="back-button">← Back to Users</Link>
      </div>

      <section className="reviews-section">
        <h2>User Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          <ul className="review-list">
            {reviews.map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
                fetchReviews={fetchUserReviews} 
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default UserDetail;