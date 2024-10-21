const express = require("express");
const router = express.Router();
const { createReview, getReviews, updateReview, deleteReview, fetchReviewsByBusinessId, findExistingReview, fetchReviewsByUserId } = require("../db/reviews"); // Adjust the import based on your db structure

// Create a review
router.post("/", async (req, res, next) => {
    // console.log('req.body.reviewText', req.body.review_text)
    try {
    //   console.log('Request body:', req.body);
      
      // Check if the user has already submitted a review for this item
      const existingReview = await findExistingReview(req.body.userId, req.body.businessId);
      if (existingReview) {
        return res.status(400).json({ message: "You have already submitted a review for this item." });
      }
      
      // Proceed to create a new review
      const review = await createReview({
        userId: req.body.userId, 
        businessId: req.body.businessId, // Ensure you pass businessId here
        review_text: req.body.review_text,
        rating: req.body.rating // Change 'rating' if needed
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
    const { userId } = req.params;
    try {
        const reviews = await fetchReviewsByUserId(userId);
        console.log(reviews)
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
    const userId = req.user.id; 
    try {
        await deleteReview(req.params.reviewId, userId);
        res.status(204).send(); 
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