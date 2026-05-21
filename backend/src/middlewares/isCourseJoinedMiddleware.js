const Enrollment = require("../models/Enrollment");
const Lecture = require("../models/Lecture");
const Module = require("../models/Module");
async function isCourseJoinedMiddleware(req, res, next) {
    const lectureId = req.params.lectureId;
    const user = req.user;
    const lecture = await Lecture.findById(lectureId).populate("chapter");
    const module = await Module.findById(lecture.chapter.module);
    const courseId = module.course;
    const isJoined = await Enrollment.findOne({ student: user._id, course: courseId });
    if (!isJoined) {
        return res.status(401).send({ success: false, message: "Unauthorized access" });
    }
    next();
}

module.exports = isCourseJoinedMiddleware;