const express = require("express");
const { register, login, logout, getMe } = require("../controllers/authController");
const asyncHandler = require("../handlers/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../utils/upload");
const router = express.Router();
router.post("/register", upload.single("profileImage"), asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/logout", asyncHandler(authMiddleware), asyncHandler(logout));
router.get("/me", asyncHandler(authMiddleware), asyncHandler(getMe));
module.exports = router;

// Register API: http://localhost:4000/api/v1/auth/register:
// REQ: {fullName,email,password,role,}
// RES: {success: true,message,userData}