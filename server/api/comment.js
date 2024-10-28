const express = require('express');
const router = express.Router();
const { client } = require('../db');
const { authenticateUser } = require('../db/user');

// Add a new comment (protected route)
router.post('/', authenticateUser, async (req, res) => {
  const { review_id, comment_text } = req.body;
  const user_id = req.user.id; // Extract user ID from the token

  if (!review_id || !comment_text) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const result = await client.query(
      'INSERT INTO comments (review_id, user_id, comment_text) VALUES ($1, $2, $3) RETURNING *',
      [review_id, user_id, comment_text]
    );

    const newComment = result.rows[0];
    newComment.username = req.user.username;
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a comment
router.delete('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id; // Get user ID from token

  try {
    // Check if the comment belongs to the authenticated user
    const result = await client.query('SELECT user_id FROM comments WHERE id = $1', [id]);
    const comment = result.rows[0];

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' });
    }

    if (comment.user_id !== user_id) {
      return res.status(403).json({ error: 'Unauthorized to delete this comment.' });
    }

    // Delete the comment
    await client.query('DELETE FROM comments WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get comments for a specific review
router.get('/:reviewId/comments', async (req, res) => {
  const { reviewId } = req.params;

  try {
    const result = await client.query(
      `SELECT comments.id, comments.comment_text, comments.created_at, 
              users.username 
       FROM comments 
       JOIN users ON comments.user_id = users.id 
       WHERE comments.review_id = $1 
       ORDER BY comments.created_at ASC`,
      [reviewId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a comment (only the owner can update)
router.put('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { comment_text } = req.body;
  const user_id = req.user.id; // Get user ID from token

  try {
    // Check if the comment exists and belongs to the authenticated user
    const result = await client.query('SELECT user_id FROM comments WHERE id = $1', [id]);
    const comment = result.rows[0];

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' });
    }

    if (comment.user_id !== user_id) {
      return res.status(403).json({ error: 'Unauthorized to edit this comment.' });
    }

    // Update the comment
    await client.query(
      'UPDATE comments SET comment_text = $1 WHERE id = $2 RETURNING *',
      [comment_text, id]
    );

    res.status(200).json({ message: 'Comment updated successfully.' });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;