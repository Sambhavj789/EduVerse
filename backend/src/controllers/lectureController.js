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
    return res.send({ success: true, message: "Lecture Added Successfully", data: newLectureData });
}

async function manageMaterials(req, res) {
    const { lectureId } = req.body;
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        return res.status(404).send({ success: false, message: "Lecture Not Found" });
    }

    const uploadedFiles = Array.isArray(req.files) ? req.files : [];
    let materialsData = req.body.materialsData || [];

    if (typeof materialsData === "string") {
        try {
            materialsData = JSON.parse(materialsData);
        }
        catch (err) {
            materialsData = [];
        }
    }

    if (!Array.isArray(materialsData) || !materialsData.length) {
        materialsData = uploadedFiles.map((file, index) => ({
            title: uploadedFiles.length === 1 ? req.body.title || file.originalname : file.originalname,
            type: req.body.type || "file"
        }));
    }

    const newMaterials = materialsData.map((material, index) => ({
        title: material.title || uploadedFiles[index]?.originalname || `Resource ${lecture.materials.length + index + 1}`,
        type: material.type || "file",
        fileUrl: material.fileUrl || uploadedFiles[index]?.filename || ""
    })).filter((material) => material.fileUrl);

    lecture.materials = [...lecture.materials, ...newMaterials];
    const newLectureData = await lecture.save();
    return res.send({ success: true, message: "Materials Uploaded Successfully", data: newLectureData });
}

async function updateMaterial(req, res) {
    const { lectureId, fileUrl, title } = req.body;
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        return res.status(404).send({ success: false, message: "Lecture Not Found" });
    }

    const material = lecture.materials.find((item) => item.fileUrl === fileUrl);
    if (!material) {
        return res.status(404).send({ success: false, message: "Resource Not Found" });
    }

    material.title = title || material.title;
    await lecture.save();

    return res.send({ success: true, message: "Resource Updated Successfully", data: lecture });
}

async function deleteMaterial(req, res) {
    const { lectureId, fileUrl } = req.body;
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        return res.status(404).send({ success: false, message: "Lecture Not Found" });
    }

    const material = lecture.materials.find((item) => item.fileUrl === fileUrl);
    if (!material) {
        return res.status(404).send({ success: false, message: "Resource Not Found" });
    }

    lecture.materials = lecture.materials.filter((item) => item.fileUrl !== fileUrl);

    const filePath = path.join(__dirname, "../../uploads", fileUrl);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    await lecture.save();

    return res.send({ success: true, message: "Resource Deleted Successfully", data: lecture });
}
// oldMaterials = [{title:"",fileUrl:"",type:""}]
// materialsData = [{title:"",type:""}]
// materials = [file1,file2,...,fileN]

async function updateLecture(req, res) {
    const data = lectureValidator(req);
    const oldThumbnail = req.body.oldThumbnail;
    const oldVideoUrl = req.body.oldVideoUrl;
    data.thumbnail = data.thumbnail || oldThumbnail;
    data.videoUrl = data.videoUrl || oldVideoUrl;
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
        return res.status(404).send({ success: false, message: "Lecture Not Found" });
    }

    if (!lecture.videoUrl) {
        return res.status(404).send({ success: false, message: "Lecture Video Not Found" });
    }

    const videoUrl = lecture.videoUrl; // Video name
    const videoPath = path.join(__dirname, "../../uploads", videoUrl);
    if (!fs.existsSync(videoPath)) {
        return res.status(404).send({ success: false, message: "Video File Not Found" });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range; // bytes = 100000

    if (!range) {
        res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
            "Accept-Ranges": "bytes"
        });
        fs.createReadStream(videoPath).pipe(res);
        return;
    }

    const CHUNK_SIZE = 10 ** 6; // 1mb
    const start = getNumber(range);
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers);
    // 206 status code is used when we send patial data
    const stream = fs.createReadStream(videoPath, { start: start, end: end });
    stream.pipe(res);

}

module.exports = { createLecture, updateLecture, deleteLecture, getLectures, getSingleLecture, manageMaterials, updateMaterial, deleteMaterial, streamVideo };
