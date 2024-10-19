const express = require("express");
const router = express.Router();
const { createReview, getReviews, updateReview, deleteReview } = require("../db/reviews"); // Adjust the import based on your db structure

// Create a review
router.post("/", async (req, res, next) => {
    try {
        const review = await createReview(req.body); // Expecting data in req.body
        res.status(201).send(review);
    } catch (error) {
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

// Endpoint to submit a new review
router.post("/", async (req, res, next) => {
  try {
    // Check if the user has already submitted a review for this item
    const existingReview = await findExistingReview(req.body.itemId, req.body.userId);
    if (existingReview) {
      return res.status(400).json({ message: "You have already submitted a review for this item." });
    }
    
    const newReview = await createReview(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});


module.exports = router;