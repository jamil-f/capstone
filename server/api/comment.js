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
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await client.query('DELETE FROM comments WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comments for a specific review
router.get('/:reviewId/comments', async (req, res) => {
  console.log('Fetching comments for reviewId:', req.params.reviewId);
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

module.exports = router;