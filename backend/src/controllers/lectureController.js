const Chapter = require("../models/Chapter");
const Lecture = require("../models/Lecture");
const lectureValidator = require("../validators/lectureValidator");

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
    return res.send({ success: true, message: "Lecture Added Successfully", data: newLectureData });
}

async function manageMaterials(req, res) {
    const oldMaterials = req.body.oldMaterials || [];
    const materialsData = req.body.materialsData || [];
    const uploadedFiles = req.files;
    const { lectureId } = req.body;
    for (let i = 0; i < materialsData.length; i++) {
        const material = materailsData[i];
        material.fileUrl = uploadedFiles[i].filename;
    }
    const finalMaterials = [...oldMaterials, ...materialsData];
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
        return res.status(404).send({ success: false, message: "Lecture Not Found" });
    }
    lecture.materials = finalMaterials;
    const newLectureData = await lecture.save();
    return res.send({ success: true, message: "Materials Uploaded Successfully", data: newLectureData });
}
// oldMaterials = [{title:"",fileUrl:"",type:""}]
// materialsData = [{title:"",type:""}]
// materials = [file1,file2,...,fileN]

async function updateLecture(req, res) {
    const data = lectureValidator(req);
    const oldThumbnail = req.body.oldThumbnail;
    const oldVideoUrl = req.body.oldVideoUrl;
    data.thumbnail = oldThumbnail || data.thumbnail;
    data.videoUrl = oldVideoUrl || data.videoUrl;
    const lectureId = req.body.lectureId;
    const updatedLectureData = await Lecture.findByIdAndUpdate(lectureId, {
        title: data.title,
        description: data.description,
        duration: data.duration,
        thumbnail: data.thumbnail,
        videoUrl: data.videoUrl,
        textContent: data.textContent
    }, { new: true });
    return res.send({ success: true, message: "Lecture Updated Successfully", data: updatedLectureData });
}

async function deleteLecture(req, res) {
    const { lectureId } = req.body;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
        return res.status(404).send({ success: false, message: "Lecture Not Found" });
    }
    const chapterId = lecture.chapter;
    const chapter = await Chapter.findById(chapterId);
    chapter.lectures = chapter.lectures.filter((id) => id != lectureId);
    await chapter.save();
    await Lecture.findByIdAndDelete(lectureId);
    await Lecture.updateMany({
        chapter: chapterId,
        order: { $gt: lecture.order }
    }, {
        order: { $inc: -1 }
    })
    res.send({ success: true, message: "Lecture Deleted Successfully" });
}

async function getLectures(req, res) {
    const chapterId = req.params.chapterId;
    const allLectures = await Lecture.find({ chapter: chapterId });
    return res.send({ success: true, message: 'Success', data: allLectures });
}

async function getSingleLecture(req, res) {
    const lectureId = req.params.lectureId;
    const lecture = await Lecture.findById(lectureId);
    return res.send({ success: true, message: "Success", data: lecture });
}

module.exports = { createLecture, updateLecture, deleteLecture, getLectures, getSingleLecture, manageMaterials };