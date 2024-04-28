const express = require("express");
const router = express.Router();
const {
  handleGenerateNewUrl,
  handleGetAnalytics,
  handleRequestUrl,
} = require("../controller/url.js");

router.post("/", handleGenerateNewUrl);
router.get("/analytics", handleGetAnalytics);
router.get("/:shortId", handleRequestUrl);

module.exports = router;
