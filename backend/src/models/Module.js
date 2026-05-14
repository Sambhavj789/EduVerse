const mongoose = require("mongoose");
const moduleSchema = mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: "courses", required: true },
    title: { type: String, required: true },
    order: Number,
    chapters: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "chapters" }], required: true, default: [] }
}, { timestamps: true });
const moduleModel = mongoose.model("modules", moduleSchema);
module.exports = moduleModel; //CommonJS Syntax
// export default moduleModel : ModuleJs Syntax