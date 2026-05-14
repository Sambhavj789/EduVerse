const mongoose = require("mongoose");
const enrollmentSchema = mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "courses", required: true },
    enrolledAt: { type: Date, default: Date.now() }

}, { timestamps: true });
const enrollmentModel = mongoose.model("enrollments", enrollmentSchema);
module.exports = enrollmentModel;
