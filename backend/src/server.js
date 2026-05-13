const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectToDB = require("./config/db");
const app = express();
connectToDB();
app.use(cors({
    origin: process.env.MODE == "production" ? process.env.FRONTEND_URL : "*",
    credentials: true
}))
app.get("/health", (req, res) => {
    res.send("<h1>Server Is Running Perfectly</h1>");
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server Is Running At:\nhttp://localhost:${PORT}/health`);
})
