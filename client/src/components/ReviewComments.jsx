import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewComments = ({ reviewId, currentUserId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');
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

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedComment(comment.comment_text);
  };

  const saveEdit = async (commentId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/comment/${commentId}`,
        { comment_text: editedComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, comment_text: editedComment } : c))
      );
      setEditingCommentId(null);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/api/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div>
      <h4>Comments</h4>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {editingCommentId === comment.id ? (
              <div>
                <input
                  type="text"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <button onClick={() => saveEdit(comment.id)}>Save</button>
                <button onClick={() => setEditingCommentId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{comment.username}</strong>: {comment.comment_text}
                {comment.user_id === currentUserId && (
                  <>
                    <button onClick={() => handleEdit(comment)}>Edit</button>
                    <button onClick={() => handleDelete(comment.id)}>Delete</button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {token ? (
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