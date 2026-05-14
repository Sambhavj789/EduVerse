const mongoose = require("mongoose");
const lectureSchema = mongoose.Schema({
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "chapters", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: Number,
    duration: { type: Number, required: true, default: 0 },
    thumbnail: { type: String, required: true },
    videoUrl: { type: String },
    textContent: { type: String },
    materials: {
        type: [{
            type: {
                title: String,
                fileUrl: String,
                type: String
            }
        }],
        default: []
    },
    quizes: { type: mongoose.Schema.Types.ObjectId, ref: "quizes", default: [] }
}, { timestamps: true });
const lectureModel = mongoose.model("lectures", lectureSchema);
module.exports = lectureModel;