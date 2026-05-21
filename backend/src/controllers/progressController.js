const Lecture = require("../models/Lecture");
const Progress = require("../models/Progress");
async function markLectureComplete(req, res) {
    const { studentId, courseId, lectureId } = req.body;
    const studentProgressData = await Progress.findOne({ student: studentId, course: courseId });
    studentProgressData.completedLectures.push(lectureId);
    const lectureData = await Lecture.findById(lectureId);
    const chapterId = lectureData.chapter;
    const totalLectures = await Lecture.countDocuments({ chapter: chapterId });
    const totalProgress = studentProgressData.completedLectures.length / totalLectures * 100;
    studentProgressData.overallProgress = totalProgress;
    const newProgressData = await studentProgressData.save();
    return res.send({ success: true, message: "Lecture Marked Completed" });
}

async function markLectureInComplete(req, res) {
    const { studentId, courseId, lectureId } = req.body;
    const studentProgressData = await Progress.findOne({ student: studentId, course: courseId });
    studentProgressData.completedLectures = studentProgressData.completedLectures.filter((id) => id != lectureId);
    const lectureData = await Lecture.findById(lectureId);
    const chapterId = lectureData.chapter;
    const totalLectures = await Lecture.countDocuments({ chapter: chapterId });
    const totalProgress = studentProgressData.completedLectures.length / totalLectures * 100;
    studentProgressData.overallProgress = totalProgress;
    const newProgressData = await studentProgressData.save();
    return res.send({ success: true, message: "Lecture Marked Incomplete" });
}

module.exports = { markLectureComplete, markLectureInComplete };