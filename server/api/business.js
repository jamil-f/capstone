const express = require("express");
const router = express.Router();

const { fetchBusinesses, fetchBusinessById, fetchReviewsByBusinessId } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const businesses = await fetchBusinesses(); 
    res.send(businesses); 
  } catch (ex) {
    next(ex); 
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const businessId = parseInt(req.params.id, 10); 
    const business = await fetchBusinessById(businessId);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const reviews = await fetchReviewsByBusinessId(businessId); // Get reviews

    // Merge business details with reviews and send in response
    res.status(200).json({ 
      id: business.id,
      name: business.name,
      description: business.description,
      image_url: business.image_url,
      averageRating: business.averageRating,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching business or reviews:", error.message);
    res.status(500).json({ error: "Failed to fetch business details." });
  }
});

module.exports = router;
