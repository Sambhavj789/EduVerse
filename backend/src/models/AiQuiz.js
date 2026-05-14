const mongoose = require("mongoose");
const aiQuizSchema = mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
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
const aiQuizModel = mongoose.model("ai_quizes", aiQuizSchema);
module.exports = aiQuizModel;