const express = require("express");
const router = express.Router();
const asyncHandler = require("../handlers/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const { markLectureComplete, markLectureInComplete } = require("../controllers/progressController");
router.post("/mark-complete", asyncHandler(authMiddleware), asyncHandler(markLectureComplete));

router.post("mark-incomplete", asyncHandler(authMiddleware), asyncHandler(markLectureInComplete));

module.exports = router;