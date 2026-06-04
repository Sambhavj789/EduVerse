const courseValidator = require("../validators/courseValidator");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Module = require("../models/Module");
const Chapter = require("../models/Chapter");

async function createCourse(req, res) {
  const courseData = courseValidator(req);
  const newCourse = new Course(courseData);
  const newCourseData = await newCourse.save();
  return res.send({
    success: true,
    message: "Course Created Successfully",
    courseData: newCourseData,
  });
}

async function updateCourse(req, res) {
  const courseId = req.body.courseId;
  const courseData = courseValidator(req);
  const oldThumbnail = req.body.oldThumbnail;
  const oldTrailerVideo = req.body.oldTrailerVideo;
  const thumbnail = courseData.thumbnail || oldThumbnail;
  const trailerVideo = courseData.trailerVideo || oldTrailerVideo;
  const isCourseExists = await Course.findById(courseId);
  if (!isCourseExists) {
    return res
      .status(404)
      .send({ success: false, message: "Course Not Found" });
  }
  const updatedCourseData = await Course.findByIdAndUpdate(courseId, {
    ...courseData,
    thumbnail,
    trailerVideo,
  });
  res.send({
    success: true,
    message: "Course Updated Successfully",
    updatedCourseData,
  });
}

// Pagination: You have 1000 products on your db and you send it all to client device, it is not optimal solution as client can see limited data at a time
// So we Send partial data at a time (10)
async function getAllCourses(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const category = req.query.category;
  const language = req.query.language;
  const level = req.query.level;
  const search = req.query.search; // a
  let filter = {};
  if (category) {
    filter.category = { $in: category };
  }
  if (language) {
    filter.language = { $in: language };
  }
  if (level) {
    filter.level = { $in: level };
  }
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }
  const courses = await Course.find(filter).skip(skip).limit(limit);
  const totalCourse = await Course.countDocuments(filter);
  return res.send({
    success: true,
    data: courses,
    pagination: {
      total: totalCourse,
      page: page,
      totalPages: Math.ceil(totalCourse / limit),
      hasNextPage: page * limit < totalCourse,
      hasPreviousPage: page > 1,
    },
  });
}
// Math.ceil(5.2)  ==> 6

async function getSingleCourse(req, res) {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId).populate([
    { path: "teacher" },
    { path: "modules" },
  ]);
  return res.send({ success: true, message: "Success", data: course });
}

async function deleteCourse(req, res) {
  const courseId = req.params.courseId;
  const response = await Course.findByIdAndDelete(courseId);
  return res.send({
    success: true,
    message: "Course Deleted Successfully",
    response,
  });
}

async function getTeacherCourses(req, res) {
  const teacherId = req.params.teacherId;
  const allTeacherCourses = await Course.find({ teacher: teacherId });
  return res.send({
    success: true,
    message: "Success",
    data: allTeacherCourses,
  });
}

async function getTeacherDashboard(req, res) {
  const { teacherId } = req.params;

  const courses = await Course.find({ teacher: teacherId })
    .sort({ createdAt: -1 })
    .lean();

  const courseIds = courses.map((course) => course._id);
  const modules = await Module.find({ course: { $in: courseIds } }).lean();
  const chapterIds = modules.flatMap((module) => module.chapters || []);
  const chapters = await Chapter.find({ _id: { $in: chapterIds } }).lean();
  const enrollments = await Enrollment.aggregate([
    {
      $match: {
        course: { $in: courseIds },
      },
    },
    {
      $group: {
        _id: "$course",
        totalStudents: { $sum: 1 },
      },
    },
  ]);

  const studentCountByCourse = new Map(
    enrollments.map((item) => [item._id.toString(), item.totalStudents]),
  );

  const totalCourses = courses.length;
  const totalModules = modules.length;
  const totalChapters = chapters.length;
  const totalLectures = chapters.reduce(
    (count, chapter) => count + (chapter.lectures?.length || 0),
    0,
  );
  const totalStudents = enrollments.reduce(
    (count, item) => count + item.totalStudents,
    0,
  );
  const totalDuration = courses.reduce(
    (count, course) => count + (course.totalDuration || 0),
    0,
  );

  const recentCourses = courses.slice(0, 3).map((course) => ({
    ...course,
    moduleCount: course.modules?.length || 0,
    studentCount: studentCountByCourse.get(course._id.toString()) || 0,
  }));

  return res.send({
    success: true,
    message: "Success",
    data: {
      totalCourses,
      totalModules,
      totalChapters,
      totalLectures,
      totalStudents,
      totalDuration,
      recentCourses,
    },
  });
}

async function getStudentJoinedCourses(req, res) {
  const { studentId } = req.params;
  const courses = await Enrollment.find({ student: studentId }).populate(
    "course",
  );
  const data = courses.map((course) => course.course);
  return res.send({
    success: true,
    message: "Success",
    data: data,
  });
}

async function isStudentJoined(req, res) {
  const courseId = req.params.courseId;
  const user = req.user;
  const isJoined = await Enrollment.findOne({
    student: user._id,
    course: courseId,
  });
  return res.send({ success: true, message: "Success", data: isJoined });
}

module.exports = {
  createCourse,
  updateCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  getTeacherCourses,
  getTeacherDashboard,
  getStudentJoinedCourses,
  isStudentJoined,
};
