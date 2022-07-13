const express = require("express");
const router = express.Router();

const matchApiController = require("../controllers/matchApi");

router.get("/", matchApiController.getMatches);

router.get("/:id", matchApiController.getMatch);

module.exports = router;