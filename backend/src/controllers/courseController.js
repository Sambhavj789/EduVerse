const courseValidator = require("../validators/courseValidator");
const Course = require("../models/Course");
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
  const course = await Course.findById(courseId).populate("teacher");
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

async function getStudentJoinedCourses(req, res) {}

module.exports = {
  createCourse,
  updateCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  getTeacherCourses,
};
