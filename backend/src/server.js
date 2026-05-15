const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectToDB = require("./config/db");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const app = express();
connectToDB();
app.use(cors({
    origin: process.env.MODE == "production" ? process.env.FRONTEND_URL : "*",
    credentials: true
})); // Middleware to accept request from other server
app.use(cookieParser()); // Middleware to parse client cokkies
app.use(errorMiddleware); // Using errorMiddleware globally

app.get("/health", (req, res) => {
    res.send("<h1>Server Is Running Perfectly</h1>");
})
app.use("/api/v1/auth", authRoutes); // Using routes defined in authRoutes file

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server Is Running At:\nhttp://localhost:${PORT}/health`);
})
