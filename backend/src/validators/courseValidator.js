function courseValidator(req) {
    const { title, description, category, level, language, teacher, requirements, learningOutcomes } = req.body;
    let modules = [];
    let totalDuration = 0;
    let totalLectures = 0;
    let totalStudents = 0;
    let thumbnail = req.files?.thumbnail?.[0]?.filename;
    let trailerVideo = req.files?.trailerVideo?.[0]?.filename;
    if (!title || !description || !category || !level || !language || !teacher || !requirements || !learningOutcomes) {
        throw new Error("Required Fields Not Found");
    }
    return {
        title, description, category, level, language, teacher, requirements, learningOutcomes, thumbnail, trailerVideo, totalDuration, totalLectures, totalStudents
    }
}

module.exports = courseValidator;
