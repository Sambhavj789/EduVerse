const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    fullname: { type: String, lowercase: true, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, minlength: 8, required: true },
    role: { type: String, enum: ["student", "teacher", "admin"], required: true, default: "student" },
    profileImage: { type: String, default: "" },
    bio: { type: String, default: "" }
}, { timestamps: true });

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;