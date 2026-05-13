const mongoose = require("mongoose");
async function connectToDB() {
    try {
        const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/EduVerse";
        await mongoose.connect(MONGO_URL);
        console.log("Connected To DB");
    } catch (error) {
        console.log(`Error Occured While Connecting to DB\n${error}`);
    }
}

module.exports = connectToDB;
