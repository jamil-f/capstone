const express = require("express");
const router = express.Router();

const { fetchBusinesses, fetchBusinessById, fetchReviewsByBusinessId } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusinesses());
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const businessId = parseInt(req.params.id, 10); // Ensure ID is an integer

    const business = await fetchBusinessById(businessId);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const reviews = await fetchReviewsByBusinessId(businessId); // Get reviews
    res.status(200).json({ business, reviews }); // Return both business and reviews
  } catch (error) {
    console.error("Error fetching business or reviews:", error.message);
    res.status(500).json({ error: "Failed to fetch business details." });
  }
});

module.exports = router;
