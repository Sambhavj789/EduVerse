const mongoose = require("mongoose");
const quizSchema = mongoose.Schema({
    lecture: { type: mongoose.Schema.Types.ObjectId, ref: "lectures", required: true },
    title: { type: String, required: true },
    totalMarks: { type: Number },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    questions: {
        type: [
            {
                type: {
                    question: String,
                    options: [String],
                    correctAnswer: String,
                    explanation: String,
                    marks: Number
                }
            }
        ]
    }
}, { timestamps: true });
const quizModel = mongoose.model("quizes", quizSchema);
module.exports = quizModel;