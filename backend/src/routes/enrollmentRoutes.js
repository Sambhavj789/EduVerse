const express = require("express");
const router = express.Router();
const asyncHandler = require("../handlers/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const { joinCourse, getMyCourses, getEnrollmentStatus } = require("../controllers/enrollmentController");
router.post("/join", asyncHandler(authMiddleware), asyncHandler(joinCourse));
router.get("/my-courses", asyncHandler(authMiddleware), asyncHandler(getMyCourses));
router.get("/status/:courseId", asyncHandler(authMiddleware), asyncHandler(getEnrollmentStatus));
module.exports = router;
