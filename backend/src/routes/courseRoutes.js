const express = require("express");
const asyncHandler = require("../handlers/asyncHandler");
const { createCourse, updateCourse, getAllCourses, getSingleCourse, deleteCourse } = require("../controllers/courseController");
const authMiddleware = require("../middlewares/authMiddleware");
const teacherProtectedMiddleware = require("../middlewares/teacherProtectedMiddleware");
const router = express.Router();
const upload = require("../utils/upload");
router.post("/create",
    asyncHandler(authMiddlware),
    asyncHandler(teacherProtectedMiddleware),
    upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "trailerVideo", maxCount: 1 }]),
    asyncHandler(createCourse));

router.put("/update",
    asyncHandler(authMiddleware),
    asyncHandler(teacherProtectedMiddleware),
    upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "trailerVideo", maxCount: 1 }]),
    asyncHandler(updateCourse));

router.get("/all",
    asyncHandler(getAllCourses));

router.get("/:courseId",
    asyncHandler(getSingleCourse));

router.delete("/:courseId",
    asyncHandler(authMiddleware),
    asyncHandler(teacherProtectedMiddleware),
    asyncHandler(deleteCourse));

module.exports = router;