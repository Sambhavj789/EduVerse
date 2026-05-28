const express = require("express");
const router = express.Router();
const asyncHandler = require("../handlers/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const { toggleLectureCompletion, getCourseProgress, submitQuiz } = require("../controllers/progressController");
router.get("/:courseId", asyncHandler(authMiddleware), asyncHandler(getCourseProgress));
router.post("/lectures/:lectureId/toggle", asyncHandler(authMiddleware), asyncHandler(toggleLectureCompletion));

router.post("/quizzes/:quizId/submit", asyncHandler(authMiddleware), asyncHandler(submitQuiz));

module.exports = router;
