const Chapter = require("../models/Chapter");
const Lecture = require("../models/Lecture");
const lectureValidator = require("../validators/lectureValidator");
const path = require("path");
const fs = require("fs");

async function createLecture(req, res) {
  const data = lectureValidator(req);
  const chapter = await Chapter.findById(data.chapter);
  const order = chapter.lectures.length + 1;
  data.order = order;
  data.materials = [];
  data.quizes = [];
  const newLecture = new Lecture(data);
  const newLectureData = await newLecture.save();
  chapter.lectures.push(newLectureData._id);
  await chapter.save();
  return res.send({
    success: true,
    message: "Lecture Added Successfully",
    data: newLectureData,
  });
}

async function manageMaterials(req, res) {
  const oldMaterials = JSON.parse(req.body.oldMaterials || "[]") || [];
  const materialsData = JSON.parse(req.body.materialsData || "[]") || [];
  const textMaterialsData = JSON.parse(req.body.textMaterials || "[]") || [];
  const uploadedFiles = req.files || [];
  const { lectureId } = req.body;

  if (uploadedFiles.length < materialsData.length) {
    const error = new Error("File resource is missing its uploaded file");
    error.statusCode = 400;
    throw error;
  }

  for (let i = 0; i < materialsData.length; i++) {
    const material = materialsData[i];
    material.fileUrl = uploadedFiles[i].filename;
  }

  const normalizedTextMaterials = textMaterialsData.map((material) => ({
    title: material.title,
    type: material.type,
    textContent: material.textContent || material.text || "",
  }));

  const finalMaterials = [
    ...oldMaterials,
    ...materialsData,
    ...normalizedTextMaterials,
  ];
  const lecture = await Lecture.findById(lectureId);
  if (!lecture) {
    return res
      .status(404)
      .send({ success: false, message: "Lecture Not Found" });
  }
  lecture.materials = finalMaterials;
  const newLectureData = await lecture.save();
  return res.send({
    success: true,
    message: "Materials Uploaded Successfully",
    data: newLectureData,
  });
}
// oldMaterials = [{title:"",fileUrl:"",type:""}]
// materialsData = [{title:"",type:""}]
// materials = [file1,file2,...,fileN]

async function updateLecture(req, res) {
  const data = lectureValidator(req, "edit");
  const oldThumbnail = req.body.oldThumbnail;
  const oldVideoUrl = req.body.oldVideoUrl;
  data.thumbnail = oldThumbnail || data.thumbnail;
  data.videoUrl = oldVideoUrl || data.videoUrl;
  const lectureId = req.body.lectureId;
  const updatedLectureData = await Lecture.findByIdAndUpdate(
    lectureId,
    {
      title: data.title,
      description: data.description,
      duration: data.duration,
      thumbnail: data.thumbnail,
      videoUrl: data.videoUrl,
      textContent: data.textContent,
    },
    { new: true },
  );
  return res.send({
    success: true,
    message: "Lecture Updated Successfully",
    data: updatedLectureData,
  });
}

async function deleteLecture(req, res) {
  const { lectureId } = req.body;
  const lecture = await Lecture.findById(lectureId);
  if (!lecture) {
    return res
      .status(404)
      .send({ success: false, message: "Lecture Not Found" });
  }
  const chapterId = lecture.chapter;
  const chapter = await Chapter.findById(chapterId);
  chapter.lectures = chapter.lectures.filter((id) => id != lectureId);
  await chapter.save();
  await Lecture.findByIdAndDelete(lectureId);
  await Lecture.updateMany(
    {
      chapter: chapterId,
      order: { $gt: lecture.order },
    },
    {
      order: { $inc: -1 },
    },
  );
  res.send({ success: true, message: "Lecture Deleted Successfully" });
}

async function getLectures(req, res) {
  const chapterId = req.params.chapterId;
  const allLectures = await Lecture.find({ chapter: chapterId });
  return res.send({ success: true, message: "Success", data: allLectures });
}

async function getSingleLecture(req, res) {
  const lectureId = req.params.lectureId;
  const lecture = await Lecture.findById(lectureId).populate("quizes");
  return res.send({ success: true, message: "Success", data: lecture });
}
// helper function to get number inside a string
function getNumber(text) {
  let ans = "";
  let valid = "0123456789";
  for (let char of text) {
    if (valid.includes(char)) {
      ans += char;
    }
  }
  return Number(ans);
}

async function streamVideo(req, res) {
  const lectureId = req.params.lectureId;
  const lecture = await Lecture.findById(lectureId);
  if (!lecture) {
    return res
      .status(404)
      .send({ success: false, message: "Lecture Not Found" });
  }
  const videoUrl = lecture.videoUrl; // Video name
  const videoPath = path.join(__dirname, "../../uploads", videoUrl);
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range; // bytes = 100000
  if (!range) {
    return res
      .status(400)
      .send({ success: false, message: "Range is required" });
  }
  const CHUNK_SIZE = 10 ** 6; // 1mb
  const start = getNumber(range);
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}`,
    "Accept-Range": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  // 206 status code is used when we send patial data
  const stream = fs.createReadStream(videoPath, { start: start, end: end });
  stream.pipe(res);
}

module.exports = {
  createLecture,
  updateLecture,
  deleteLecture,
  getLectures,
  getSingleLecture,
  manageMaterials,
  streamVideo,
};
