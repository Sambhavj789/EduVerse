const express = require("express");
const router = express.Router();
const asyncHandler = require("../handlers/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const teacherProtectedMiddleware = require("../middlewares/teacherProtectedMiddleware");
const { createLecture, manageMaterials, updateLecture, deleteLecture, getLectures, getSingleLecture } = require("../controllers/lectureController");
const upload = require("../utils/upload");

router.post("/",
    asyncHandler(authMiddleware),
    asyncHandler(teacherProtectedMiddleware),
    upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "videoUrl", maxCount: 1 }]),
    asyncHandler(createLecture));

router.post("/materials",
    asyncHandler(authMiddleware),
    asyncHandler(teacherProtectedMiddleware),
    upload.array("materials"),
    asyncHandler(manageMaterials));

router.put("/",
    asyncHandler(authMiddleware),
    asyncHandler(teacherProtectedMiddleware),
    upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "videoUrl", maxCount: 1 }]),
    asyncHandler(updateLecture));

router.delete("/",
    asyncHandler(authMiddleware),
    asyncHandler(teacherProtectedMiddleware),
    asyncHandler(deleteLecture));

router.get("/all/:chapterId",
    asyncHandler(authMiddleware),
    asyncHandler(getLectures));

router.get("/:lectureId",
    asyncHandler(authMiddleware),
    asyncHandler(getSingleLecture));

module.exports = router;