const express = require("express");
const router = express.Router();
const asyncHandler = require("../handlers/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  markLectureComplete,
  markLectureInComplete,
  submitQuiz,
  getStudentQuizProgress,
  getStudentDashboard,
} = require("../controllers/progressController");
router.post(
  "/mark-complete",
  asyncHandler(authMiddleware),
  asyncHandler(markLectureComplete),
);

router.post(
  "/mark-incomplete",
  asyncHandler(authMiddleware),
  asyncHandler(markLectureInComplete),
);
router.post(
  "/submit-quiz",
  asyncHandler(authMiddleware),
  asyncHandler(submitQuiz),
);
router.get(
  "/quiz-progress/:studentId/:courseId",
  asyncHandler(authMiddleware),
  asyncHandler(getStudentQuizProgress),
);
router.get(
  "/dashboard/student/:studentId",
  asyncHandler(authMiddleware),
  asyncHandler(getStudentDashboard),
);

module.exports = router;
