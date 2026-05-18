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

}

async function deleteChapter(req, res) {

}

async function getChapters(req, res) {

}

module.exports = { createChapter, updateChapter, deleteChapter, getChapters };

