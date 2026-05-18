const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const teacherProtectedMiddleware = require("../middlewares/teacherProtectedMiddleware");
const asyncHandler = require("../handlers/asyncHandler");
const { createChapter, updateChapter, deleteChapter, getChapters } = require("../controllers/chapterController");

router.post("/", asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(createChapter));

router.put("/", asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(updateChapter));

router.delete("/", asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(deleteChapter));

router.get("/:moduleId", asyncHandler(getChapters))
module.exports = router;