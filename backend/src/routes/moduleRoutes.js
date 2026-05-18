const express = require("express");
const asyncHandler = require("../handlers/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const teacherProtectedMiddleware = require("../middlewares/teacherProtectedMiddleware");
const { createModule, updateModule, deleteModule, getModules } = require("../controllers/moduleController");
const router = express.Router();
router.post("/", asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(createModule));

router.put("/", asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(updateModule));

router.delete("/", asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(deleteModule));

router.get("/:courseId", asyncHandler(authMiddleware), asyncHandler(teacherProtectedMiddleware), asyncHandler(getModules));


module.exports = router;