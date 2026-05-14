const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    trailerVideo: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, enum: ["beginner", "intermediate", "advance"], required: true, default: "beginner" },
    language: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    modules: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "modules" }], required: true, default: [] },
    requirements: { type: [String], required: true },
    learningOutcomes: { type: [String] },
    totalDuration: { type: Number, default: 0, required: true },
    totalLectures: { type: Number, default: 0, required: true },
    totalStudents: { type: Number, default: 0, required: true }
}, { timestamps: true });

const courseModel = mongoose.model("courses", courseSchema);
module.exports = courseModel;