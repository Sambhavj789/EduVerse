const express = require("express");
const router = express.Router();
const asyncHandler = require("../handlers/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const { joinCourse } = require("../controllers/enrollmentController");
router.post("/join", asyncHandler(authMiddleware), asyncHandler(joinCourse));
module.exports = router;