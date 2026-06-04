const express = require("express");
const router = express.Router();
const asyncHandler = require("../handlers/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  markLectureComplete,
  markLectureInComplete,
  submitQuiz,
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

module.exports = router;
