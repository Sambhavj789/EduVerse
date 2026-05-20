const Chapter = require("../models/Chapter");
const Module = require("../models/Module");

async function createChapter(req, res) {
    const { module, title } = req.body;
    const moduleData = await Module.findById(module);
    if (!module || !title || !moduleData) {
        return res.status(400).send({ success: false, message: "Required Fields Not Found" });
    }
    const order = moduleData.chapters.length + 1;
    const newChapter = new Chapter({ module, title, order, lectures: [] });
    const newChapterData = await newChapter.save();
    moduleData.chapters.push(newChapterData._id);
    await moduleData.save();
    return res.send({ success: true, message: "Chapter Created Successfully", data: newChapterData });
}

async function updateChapter(req, res) {
    const { title, chapterId } = req.body;
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
        return res.status(404).send({ success: false, message: "Chapter Not Found" });
    }
    chapter.title = title;
    const newChapterData = await chapter.save();
    return res.send({ success: true, message: "Chapter Updated Successfully", data: newChapterData })
}

async function deleteChapter(req, res) {
    const { chapterId } = req.body;
    const chapterData = await Chapter.findById(chapterId);
    const moduleData = await Module.findById(chapterData.module);
    moduleData.chapters = moduleData.chapters.filter((id) => id != chapterId);
    await moduleData.save();
    await Chapter.findByIdAndDelete(chapterId);
    await Chapter.updateMany({
        module: chapterData.module,
        order: { $gt: chapterData.order }
    }, {
        order: { $inc: -1 }
    })
    return res.send({ success: true, message: "Chapter Deleted Successfully" });
}

async function getChapters(req, res) {
    const { moduleId } = req.params.moduleId;
    const allChapters = await Chapter.find({ module: moduleId });
    return res.send({ success: true, message: "Success", data: allChapters });
}

module.exports = { createChapter, updateChapter, deleteChapter, getChapters };

