const express = require("express");
const router = express.Router();

const { fetchBusinesses, fetchBusinessById } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusinesses());
  } catch (ex) {
    next(ex);
  }
});

// Route to get a specific business by ID
router.get("/:id", async (req, res, next) => {
  try {
    const businessId = req.params.id;
    const business = await fetchBusinessById(businessId); // Fetch business by ID

    if (!business) {
      return res.status(404).send("Business not found");
    }

    res.send(business);
  } catch (ex) {
    next(ex);
  }
});



module.exports = router;
