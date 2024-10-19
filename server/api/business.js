const express = require("express");
const router = express.Router();

const { fetchBusinesses } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusinesses());
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
