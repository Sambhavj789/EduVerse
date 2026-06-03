const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Progres = require("../models/Progress");
async function joinCourse(req, res) {
  const { studentId, courseId } = req.body;
  if (!studentId || !courseId) {
    return res
      .status(400)
      .send({ success: false, message: "Required Data Not Found" });
  }
  // checking is student is already joined
  const isJoined = await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });
  if (isJoined) {
    return res
      .status(400)
      .send({ success: false, message: "Student is already joined" });
  }
  const newEnrollment = new Enrollment({
    student: studentId,
    course: courseId,
    enrolledAt: Date.now(),
  });
  const newEnrollmentData = await newEnrollment.save();
  const course = await Course.findById(courseId);
  course.totalStudents++;
  await course.save();
  const progress = new Progres({
    student: studentId,
    course: courseId,
    completedLectures: [],
    completedQuizzes: [],
    overallProgress: 0,
  });
  const newProgressData = await progress.save();
  return res.send({
    success: true,
    message: "Course Joined Successfully",
    data: newEnrollmentData,
  });
}

module.exports = { joinCourse };
