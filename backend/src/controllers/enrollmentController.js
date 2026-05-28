const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Progress = require("../models/Progress");
async function joinCourse(req, res) {
    const { courseId } = req.body;
    const studentId = req.user?._id;

    if (!courseId || !studentId) {
        return res.status(400).send({ success: false, message: "Required Data Not Found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).send({ success: false, message: "Course Not Found" });
    }

    const alreadyJoined = await Enrollment.findOne({ student: studentId, course: courseId });
    if (alreadyJoined) {
        return res.send({ success: true, message: "Course Already Joined", data: alreadyJoined });
    }

    const newEnrollment = new Enrollment({ student: studentId, course: courseId, enrolledAt: Date.now() });
    const newEnrollmentData = await newEnrollment.save();
    course.totalStudents++;
    await course.save();

    const existingProgress = await Progress.findOne({ student: studentId, course: courseId });
    if (!existingProgress) {
        const progress = new Progress({ student: studentId, course: courseId, completedLectures: [], completedQuizzes: [], overallProgress: 0 });
        await progress.save();
    }

    return res.send({ success: true, message: "Course Joined Successfully", data: newEnrollmentData });
}

async function getMyCourses(req, res) {
    const enrollments = await Enrollment.find({ student: req.user._id })
        .sort({ createdAt: -1 })
        .populate({
            path: "course",
            populate: {
                path: "teacher",
                select: "fullname profileImage"
            }
        });

    const courseIds = enrollments.map((enrollment) => enrollment.course?._id).filter(Boolean);
    const progressList = await Progress.find({ student: req.user._id, course: { $in: courseIds } });
    const progressMap = new Map(progressList.map((progress) => [progress.course.toString(), progress]));

    const data = enrollments
        .filter((enrollment) => enrollment.course)
        .map((enrollment) => ({
            enrollmentId: enrollment._id,
            enrolledAt: enrollment.enrolledAt,
            course: enrollment.course,
            progress: progressMap.get(enrollment.course._id.toString()) || null
        }));

    return res.send({ success: true, message: "Success", data });
}

async function getEnrollmentStatus(req, res) {
    const enrollment = await Enrollment.findOne({
        student: req.user._id,
        course: req.params.courseId
    });

    return res.send({
        success: true,
        message: "Success",
        data: { isEnrolled: Boolean(enrollment), enrollment }
    });
}

module.exports = { joinCourse, getMyCourses, getEnrollmentStatus };
