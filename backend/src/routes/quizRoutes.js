const express = require("express");
const asyncHandler = require("../handlers/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const teacherProtectedMiddleware = require("../middlewares/teacherProtectedMiddleware");
const { createQuiz, updateQuiz, deleteQuiz, getLectureQuizzes } = require("../controllers/quizController");
const router = express.Router();
router.get("/lecture/:lectureId", asyncHandler(authMiddleware), asyncHandler(getLectureQuizzes));
router.post("/create",
    asyncHandler(authMiddleware),
    asyncHandler(teacherProtectedMiddleware),
    asyncHandler(createQuiz));

router.put("/",
    asyncHandler(authMiddleware),
    asyncHandler(teacherProtectedMiddleware),
    asyncHandler(updateQuiz));

router.delete("/",
    asyncHandler(authMiddleware),
    asyncHandler(teacherProtectedMiddleware),
    asyncHandler(deleteQuiz));

module.exports = router;

// Create API documentation
