const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/reviews", require("./reviews"))
router.use("/users", require("./users"));
router.use("/businesses", require("./business"));
module.exports = router;
