function parseList(value) {
    if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean);
    }

    if (!value) {
        return [];
    }

    if (typeof value === "string") {
        const trimmedValue = value.trim();

        try {
            const parsedValue = JSON.parse(trimmedValue);
            if (Array.isArray(parsedValue)) {
                return parsedValue
                    .map((item) => String(item).trim())
                    .filter(Boolean);
            }
        } catch (err) {
            // Fallback to comma-separated parsing when value is plain text.
        }

        return trimmedValue
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return [];
}

function courseValidator(req) {
    const { title, description, category, level, language, teacher } = req.body;
    const requirements = parseList(req.body.requirements);
    const learningOutcomes = parseList(req.body.learningOutcomes);
    const totalDuration = Number(req.body.totalDuration) || 0;
    const totalLectures = Number(req.body.totalLectures) || 0;
    const totalStudents = Number(req.body.totalStudents) || 0;
    const thumbnail = req.files?.thumbnail?.[0]?.filename;
    const trailerVideo = req.files?.trailerVideo?.[0]?.filename;

    if (
        !title ||
        !description ||
        !category ||
        !level ||
        !language ||
        !teacher ||
        !requirements.length ||
        !learningOutcomes.length
    ) {
        throw new Error("Required Fields Not Found");
    }

    return {
        title,
        description,
        category,
        level,
        language,
        teacher,
        requirements,
        learningOutcomes,
        thumbnail,
        trailerVideo,
        totalDuration,
        totalLectures,
        totalStudents,
    };
}

module.exports = courseValidator;
