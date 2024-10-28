const express = require("express");
const router = express.Router();
const { client } = require("../db");
const { authenticateUser } = require("../db/user");

const {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
  fetchReviewsByBusinessId,
  findExistingReview,
  fetchReviewsByUserId,
  fetchReviewById
} = require("../db/reviews"); 

// Create a review
router.post("/", async (req, res, next) => {
    try {
      
      const existingReview = await findExistingReview(req.body.userId, req.body.businessId);
      if (existingReview) {
        return res.status(400).json({ message: "You have already submitted a review for this item." });
      }
      
      const review = await createReview({
        userId: req.body.userId, 
        businessId: req.body.businessId, 
        review_text: req.body.review_text,
        rating: req.body.rating 
      }); 
      res.status(201).send(review);
    } catch (error) {
      console.error('Error creating review:', error);
      next(error);
    }
});

// Get all reviews
router.get("/", async (req, res, next) => {
    try {
        const reviews = await getReviews();
        res.status(200).send(reviews);
    } catch (error) {
        next(error);
    }
});
// Fetchs reviews for BusinessListReviews
router.get('/by-business', async (req, res) => {
  const { businessId } = req.query;
  try {
    const reviews = await fetchReviewsByBusinessId(businessId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Fetch reviews by user ID
router.get("/user/:userId", async (req, res, next) => {
    const { userId } = req.params;
    try {
        const reviews = await fetchReviewsByUserId(userId);
        res.status(200).send(reviews);
    } catch (error) {
        next(error);
    }
});


// Update a review
router.put('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { review_text, rating } = req.body;
  const userId = req.user.id; // Extract user ID from the authenticated token
  try {
    // Fetch the review by ID to verify ownership
    const review = await fetchReviewById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Ensure the authenticated user is the owner of the review
    if (review.user_id !== userId) {
      return res.status(403).json({ message: 'Unauthorized to edit this review.' });
    }

    // Proceed with the update
    const updatedReview = await updateReview(id, { review_text, rating });

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update the review' });
  }
});



// DELETE review by ID
router.delete('/:id', authenticateUser, async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user.id; // Extracted from the authenticated token
  const review = await fetchReviewById(reviewId);
  
  if (review.user_id !== userId) {
    return res.status(403).json({ message: 'Unauthorized to delete this review.' });
  }
  
  await deleteReview(reviewId);
  res.status(200).json({ message: 'Review deleted successfully.' });
});
// Endpoint to fetch existing reviews for a specific item
router.get("/:itemId", async (req, res, next) => {
  try {
    const reviews = await GetReviews(req.params.itemId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});




module.exports = router;