const Module = require("../models/Module");
const Course = require("../models/Course");
async function createModule(req, res) {
  const { course, title } = req.body;
  const teacherId = req.user._id;
  if (!course || !title || !teacherId) {
    return res
      .status(400)
      .send({ success: false, message: "Required Fields Not Found" });
  }
  const courseData = await Course.findById(course);
  if (!courseData || courseData.teacher.toString() != teacherId) {
    return res
      .status(400)
      .send({ success: false, message: "Course Not Found" });
  }
  const order = courseData.modules.length + 1;
  const newModule = new Module({ course, title, order, chapters: [] });
  const newModuleData = await newModule.save();
  courseData.modules.push(newModuleData._id);
  await courseData.save();
  return res.send({
    success: true,
    message: "Module Created Successfully",
    data: newModuleData,
  });
}

async function updateModule(req, res) {
  const { title, moduleId } = req.body;
  const moduleData = await Module.findById(moduleId).populate("course");
  const teacherId = req.user._id;
  if (!moduleData || moduleData?.course?.teacher?.toString() != teacherId) {
    return res
      .status(400)
      .send({ success: false, message: "Module Not Found" });
  }
  moduleData.title = title;
  const newModuleData = await moduleData.save();
  return res.send({ success: true, message: "Success", data: newModuleData });
}

async function deleteModule(req, res) {
  const { moduleId } = req.body;
  const moduleData = await Module.findById(moduleId).populate("course");
  const teacherId = req.user._id;
  if (!moduleData || moduleData?.course?.teacher?.toString() != teacherId) {
    return res
      .status(400)
      .send({ success: false, message: "Module Not Found" });
  }
  await Module.findByIdAndDelete(moduleId);
  const courseData = await Course.findById(moduleData.course._id);
  courseData.modules = courseData.modules.filter(
    (id) => id.toString() != moduleId,
  );
  await courseData.save();
  await Module.updateMany(
    {
      course: moduleData.course._id,
      order: { $gt: moduleData.order },
    },
    {
      order: { $inc: -1 },
    },
  );
  return res.send({ success: true, message: "Module Delete Successfully" });
}
// 1 2 3 4
async function getModules(req, res) {
  const courseId = req.params.courseId;
  const allModules = await Module.find({ course: courseId });
  return res.send({ success: true, message: "Success", data: allModules });
}

async function getSingleModule(req, res) {
  const { moduleId } = req.params;
  const moduleData = await Module.findById(moduleId).populate({path:"chapters",populate:{path:"lectures"}});
  return res.send({ success: true, message: "Success", data: moduleData });
}
module.exports = { createModule, updateModule, deleteModule, getModules,getSingleModule };
