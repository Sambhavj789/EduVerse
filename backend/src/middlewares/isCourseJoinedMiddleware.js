const Enrollment = require("../models/Enrollment");
const Lecture = require("../models/Lecture");
const Module = require("../models/Module");
async function isCourseJoinedMiddleware(req, res, next) {
    const lectureId = req.params.lectureId;
    const user = req.user;

    if (["teacher", "admin"].includes(user.role)) {
        return next();
    }

    const lecture = await Lecture.findById(lectureId).populate("chapter");
    if (!lecture) {
        return res.status(404).send({ success: false, message: "Lecture Not Found" });
    }

    const module = await Module.findById(lecture.chapter.module);
    if (!module) {
        return res.status(404).send({ success: false, message: "Module Not Found" });
    }

    const courseId = module.course;
    const isJoined = await Enrollment.findOne({ student: user._id, course: courseId });
    if (!isJoined) {
        return res.status(401).send({ success: false, message: "Unauthorized access" });
    }
    next();
}

module.exports = isCourseJoinedMiddleware;
