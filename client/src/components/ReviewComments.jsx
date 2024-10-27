import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewComments = ({ reviewId, currentUserId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [ error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/comment/${reviewId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [reviewId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:3000/api/comment',
        { review_id: reviewId, comment_text: newComment }, // No need to pass user_id if using token
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      setComments((prev) => [...prev, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment. Please try again.');
    }
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div>
      <h4>Comments</h4>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.username}</strong>: {comment.comment_text}
          </li>
        ))}
      </ul>

      {token ? ( // Check if token exists to allow comment submission
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button type="submit">Submit</button>
          {error && <p style={{ color: 'red' }}>{error}</p>} 
        </form>
      ) : (
        <p>Please log in to leave a comment.</p>
      )}
    </div>
  );
};

export default ReviewComments;