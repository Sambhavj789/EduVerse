const mongoose = require("mongoose");
const progressSchema = mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "courses", required: true },
    completedLectures: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "lectures" }], default: [] },
    completedQuizzes: {
        type: [{
            quiz: { type: mongoose.Schema.Types.ObjectId, ref: "quizes" },
            score: Number,
            quizType: { type: String, enum: ["normal", "ai"], default: "normal" },
            attemptedAt: Date
        }],
        default: []
    },
    overallProgress: { type: Number, default: 0 }
}, { timestamps: true });
const progressModel = mongoose.model("progress", progressSchema);
module.exports = progressModel;