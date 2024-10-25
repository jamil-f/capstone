import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewItem from "./ReviewItem";

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
    <div>
      <h1>{user.username}</h1>
      <h2>Reviews:</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              fetchReviews={fetchUserReviews} // Pass refresh function to ReviewItem
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDetail;