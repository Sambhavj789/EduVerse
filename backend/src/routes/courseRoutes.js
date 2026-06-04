const express = require("express");
const asyncHandler = require("../handlers/asyncHandler");
const {
  createCourse,
  updateCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  getTeacherCourses,
  getTeacherDashboard,
  getStudentJoinedCourses,
  isStudentJoined,
} = require("../controllers/courseController");
const authMiddleware = require("../middlewares/authMiddleware");
const teacherProtectedMiddleware = require("../middlewares/teacherProtectedMiddleware");
const router = express.Router();
const upload = require("../utils/upload");
router.post(
  "/create",
  asyncHandler(authMiddleware),
  asyncHandler(teacherProtectedMiddleware),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "trailerVideo", maxCount: 1 },
  ]),
  asyncHandler(createCourse),
);

router.put(
  "/update",
  asyncHandler(authMiddleware),
  asyncHandler(teacherProtectedMiddleware),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "trailerVideo", maxCount: 1 },
  ]),
  asyncHandler(updateCourse),
);

router.get("/all", asyncHandler(getAllCourses));

router.get("/:courseId", asyncHandler(getSingleCourse));

router.delete(
  "/:courseId",
  asyncHandler(authMiddleware),
  asyncHandler(teacherProtectedMiddleware),
  asyncHandler(deleteCourse),
);

router.get(
  "/teacher-courses/:teacherId",
  asyncHandler(authMiddleware),
  asyncHandler(teacherProtectedMiddleware),
  getTeacherCourses,
);

router.get(
  "/teacher-dashboard/:teacherId",
  asyncHandler(authMiddleware),
  asyncHandler(teacherProtectedMiddleware),
  getTeacherDashboard,
);

router.get(
  "/student-join-courses/:studentId",
  asyncHandler(authMiddleware),
  asyncHandler(getStudentJoinedCourses),
);

router.get(
  "/is-student-joined/:courseId",
  asyncHandler(authMiddleware),
  asyncHandler(isStudentJoined),
);

module.exports = router;
