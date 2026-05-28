const Lecture = require("../models/Lecture");
const Progress = require("../models/Progress");
const Quiz = require("../models/Quiz");
const Chapter = require("../models/Chapter");
const Module = require("../models/Module");

async function getCourseLectureStats(courseId) {
    const modules = await Module.find({ course: courseId }).select("_id");
    const moduleIds = modules.map((module) => module._id);
    const chapters = await Chapter.find({ module: { $in: moduleIds } }).select("_id");
    const chapterIds = chapters.map((chapter) => chapter._id);
    const totalLectures = await Lecture.countDocuments({ chapter: { $in: chapterIds } });

    return { totalLectures };
}

async function getOrCreateProgress(studentId, courseId) {
    let progress = await Progress.findOne({ student: studentId, course: courseId });

    if (!progress) {
        progress = await Progress.create({
            student: studentId,
            course: courseId,
            completedLectures: [],
            completedQuizzes: [],
            overallProgress: 0
        });
    }

    return progress;
}

async function getCourseProgress(req, res) {
    const progress = await getOrCreateProgress(req.user._id, req.params.courseId);
    return res.send({ success: true, message: "Success", data: progress });
}

async function toggleLectureCompletion(req, res) {
    const { courseId, completed } = req.body;
    const { lectureId } = req.params;

    if (!courseId) {
        return res.status(400).send({ success: false, message: "Course Id Is Required" });
    }

    const progress = await getOrCreateProgress(req.user._id, courseId);
    const completedLectureIds = progress.completedLectures.map((id) => id.toString());
    const lectureIdString = lectureId.toString();

    if (completed && !completedLectureIds.includes(lectureIdString)) {
        progress.completedLectures.push(lectureId);
    }

    if (!completed) {
        progress.completedLectures = progress.completedLectures.filter((id) => id.toString() !== lectureIdString);
    }

    const { totalLectures } = await getCourseLectureStats(courseId);
    progress.overallProgress = totalLectures
        ? Math.round((progress.completedLectures.length / totalLectures) * 100)
        : 0;

    await progress.save();

    return res.send({
        success: true,
        message: completed ? "Lecture Marked Completed" : "Lecture Marked Incomplete",
        data: progress
    });
}

async function submitQuiz(req, res) {
    const { answers = [], courseId } = req.body;
    const { quizId } = req.params;

    if (!courseId) {
        return res.status(400).send({ success: false, message: "Course Id Is Required" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        return res.status(404).send({ success: false, message: "Quiz Not Found" });
    }

    let score = 0;
    const results = quiz.questions.map((question, index) => {
        const selectedAnswer = answers[index] || "";
        const isCorrect = selectedAnswer === question.correctAnswer;
        if (isCorrect) {
            score += question.marks || 1;
        }

        return {
            question: question.question,
            selectedAnswer,
            correctAnswer: question.correctAnswer,
            isCorrect,
            explanation: question.explanation || ""
        };
    });

    const progress = await getOrCreateProgress(req.user._id, courseId);
    progress.completedQuizzes = progress.completedQuizzes.filter((item) => item.quiz.toString() !== quizId);
    progress.completedQuizzes.push({
        quiz: quiz._id,
        score,
        quizType: "normal",
        attemptedAt: new Date()
    });
    await progress.save();

    return res.send({
        success: true,
        message: "Quiz Submitted Successfully",
        data: {
            score,
            totalMarks: quiz.totalMarks || quiz.questions.reduce((sum, question) => sum + (question.marks || 1), 0),
            results,
            progress
        }
    });
}

module.exports = { toggleLectureCompletion, getCourseProgress, submitQuiz };
