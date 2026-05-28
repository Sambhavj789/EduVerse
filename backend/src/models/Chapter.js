const mongoose = require("mongoose");
const chapterSchema = mongoose.Schema({
    module: { type: mongoose.Schema.Types.ObjectId, ref: "modules", required: true },
    title: { type: String, required: true },
    order: Number,
    lectures: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "lectures" }], required: true, default: [] }
}, { timestamps: true });
const chapterModel = mongoose.model("chapters", chapterSchema);
module.exports = chapterModel;