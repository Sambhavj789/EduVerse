function lectureValidator(req) {
    const { chapter, title, description, textContent } = req.body;
    const thumbnail = req.files?.thumbnail[0]?.filename;
    const videoUrl = req.files?.videoUrl[0]?.filename;
    const duration = req.body?.duration || 0;
    if (!chapter || !title || !description || !textContent) {
        throw new Error("Required Fields Not Found");
        return;
    }
    return { chapter, title, description, duration, textContent, thumbnail, videoUrl }
}

module.exports = lectureValidator;