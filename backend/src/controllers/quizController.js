const Quiz = require("../models/Quiz");
const Lecture = require("../models/Lecture");
async function createQuiz(req, res) {
    const { lecture, title, totalMarks, difficulty, questions } = req.body;
    if (!lecture || !title || !questions?.length) {
        return res.status(400).send({ success: false, message: "Required Fields Not Found" });
    }

    const newQuiz = new Quiz({ lecture, title, totalMarks, difficulty, questions });
    const newQuizData = await newQuiz.save();
    const lectureData = await Lecture.findById(lecture);
    lectureData.quizes.push(newQuizData._id);
    await lectureData.save();
    return res.send({ success: true, message: "Quiz Created Successfully", data: newQuizData });
}

async function updateQuiz(req, res) {
    const { quiz, title, totalMarks, difficulty, questions } = req.body;
    const quizData = await Quiz.findByIdAndUpdate(quiz, { title, totalMarks, difficulty, questions });
    return res.send({ success: true, message: "Quiz Updated Successfully" });

}

async function deleteQuiz(req, res) {
    const { quiz } = req.body;
    const quizData = await Quiz.findById(quiz);
    const lectureId = quizData.lecture;
    await Quiz.findByIdAndDelete(quiz);
    const lecture = await Lecture.findById(lectureId);
    lecture.quizes = lecture.quizes.filter((id) => id.toString() !== quiz);
    await lecture.save();
    return res.send({ success: true, message: "Lecture Delete Successfully" });
}

async function getLectureQuizzes(req, res) {
    const quizzes = await Quiz.find({ lecture: req.params.lectureId }).sort({ createdAt: 1 });
    return res.send({ success: true, message: "Success", data: quizzes });
}

module.exports = { createQuiz, updateQuiz, deleteQuiz, getLectureQuizzes };
