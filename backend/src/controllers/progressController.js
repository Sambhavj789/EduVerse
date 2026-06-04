const Lecture = require("../models/Lecture");
const Progress = require("../models/Progress");
const Enrollment = require("../models/Enrollment")
async function markLectureComplete(req, res) {
  const { studentId, courseId, lectureId } = req.body;
  const studentProgressData = await Progress.findOne({
    student: studentId,
    course: courseId,
  });
  studentProgressData.completedLectures.push(lectureId);
  const lectureData = await Lecture.findById(lectureId);
  const chapterId = lectureData.chapter;
  const totalLectures = await Lecture.countDocuments({ chapter: chapterId });
  const totalProgress =
    (studentProgressData.completedLectures.length / totalLectures) * 100;
  studentProgressData.overallProgress = totalProgress;
  const newProgressData = await studentProgressData.save();
  return res.send({ success: true, message: "Lecture Marked Completed" });
}

async function markLectureInComplete(req, res) {
  const { studentId, courseId, lectureId } = req.body;
  const studentProgressData = await Progress.findOne({
    student: studentId,
    course: courseId,
  });
  studentProgressData.completedLectures =
    studentProgressData.completedLectures.filter((id) => id != lectureId);
  const lectureData = await Lecture.findById(lectureId);
  const chapterId = lectureData.chapter;
  const totalLectures = await Lecture.countDocuments({ chapter: chapterId });
  const totalProgress =
    (studentProgressData.completedLectures.length / totalLectures) * 100;
  studentProgressData.overallProgress = totalProgress;
  const newProgressData = await studentProgressData.save();
  return res.send({ success: true, message: "Lecture Marked Incomplete" });
}

async function submitQuiz(req, res) {
  const { quizId, score, type, studentId, courseId } = req.body;
  const studentProgress = await Progress.findOne({
    student: studentId,
    course: courseId,
  });
  if (!studentProgress) {
    return res
      .status(404)
      .send({ success: false, message: "Join Course to solve quiz" });
  }
  studentProgress.completedQuizzes.push({
    quiz: quizId,
    quizType: type,
    score: score,
    attemptedAt: Date.now(),
  });
  const updatedStudentProgress = await studentProgress.save();
  return res.send({
    success: true,
    message: "Success",
    data: updatedStudentProgress,
  });
}

async function getStudentQuizProgress(req, res) {
  const { studentId, courseId } = req.params;

  const progress = await Progress.findOne({
    student: studentId,
    course: courseId,
  }).populate("completedQuizzes.quiz");

  if (!progress) {
    return res.send({
      success: true,
      data: [],
    });
  }

  return res.send({
    success: true,
    data: progress.completedQuizzes,
  });
}

async function getStudentDashboard(req, res) {
  const { studentId } = req.params;

  const enrollments = await Enrollment.find({
    student: studentId,
  }).populate("course");

  const progress = await Progress.find({
    student: studentId,
  });

  const totalCourses = enrollments.length;

  const totalLectures = progress.reduce(
    (acc, curr) => acc + curr.completedLectures.length,
    0,
  );

  const totalQuizzes = progress.reduce(
    (acc, curr) => acc + curr.completedQuizzes.length,
    0,
  );

  const avgProgress =
    progress.length > 0
      ? progress.reduce((acc, curr) => acc + curr.overallProgress, 0) /
        progress.length
      : 0;

  res.send({
    success: true,
    data: {
      totalCourses,
      totalLectures,
      totalQuizzes,
      avgProgress,
      courses: enrollments.map((e) => e.course),
    },
  });
}

module.exports = {
  markLectureComplete,
  markLectureInComplete,
  submitQuiz,
  getStudentQuizProgress,
  getStudentDashboard
};
