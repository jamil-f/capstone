const express = require("express");
const router = express.Router();

const { fetchUsers, fetchUserById } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  const userId = req.params.id;
  try { 
    const user = await fetchUserById(userId);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
})

module.exports = router;
