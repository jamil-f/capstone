const express = require("express");
const router = express.Router();
const { createReview, getReviews, updateReview, deleteReview, fetchReviewsByUserId, findExistingReview } = require("../db/reviews"); // Adjust the import based on your db structure

// Create a review
router.post("/", async (req, res, next) => {
    try {
      console.log('Request body:', req.body);
      
      // Check if the user has already submitted a review for this item
      const existingReview = await findExistingReview(req.body.businessId, req.body.userId);
      if (existingReview) {
        return res.status(400).json({ message: "You have already submitted a review for this item." });
      }
      
      // Proceed to create a new review
      const review = await createReview({
        userId: req.body.userId, 
        businessId: req.body.businessId, // Ensure you pass businessId here
        text: req.body.text,
        score: req.body.rating // Change 'rating' if needed
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

// Fetch reviews by user ID
router.get("/user/:userId", async (req, res, next) => {
    const userId = req.params.userId; // Get userId from URL parameters
    try {
        const reviews = await fetchReviewsByUserId(userId);
        res.status(200).send(reviews);
    } catch (error) {
        next(error);
    }
});


// Update a review
router.put("/:reviewId", async (req, res, next) => {
    try {
        const updatedReview = await updateReview(req.params.reviewId, req.body);
        res.status(200).send(updatedReview);
    } catch (error) {
        next(error);
    }
});



// Delete a review
router.delete("/:reviewId", async (req, res, next) => {
    try {
        await deleteReview(req.params.reviewId);
        res.status(204).send(); // No content
    } catch (error) {
        next(error);
    }
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