const userValidator = require("../validators/userValidator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
    const { fullname, email, password, role, bio, profileImage } = userValidator(req);
    const isEmailAlreadyRegistered = await User.findOne({ email: email });
    if (isEmailAlreadyRegistered) {
        return res.status(400).send({ success: false, message: "User Already Registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        fullname, email, password: hashedPassword, role, bio, profileImage
    })
    const userData = await newUser.save();
    return res.send({ success: true, message: "User Registered Successfully", user: userData });
}

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Required Fields Not Found");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).send({ success: false, message: "Email Or Password Is Invalid" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(404).send({ success: false, message: "Email Or Password Is Invalid" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    // http Only cokkies : Cannot be accessed by user or hacker directly
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.MODE == "production",
        sameSite: process.env.MODE == "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.send({ success: true, message: "Login Successfully", data: user });
}

async function logout(req, res) {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.MODE == "production",
        sameSite: process.env.MODE == "production" ? "none" : "lax",
        maxAge: 0
    });
    return res.send({ success: true, message: "Logout Successfully" });
}

async function getMe(req, res) {
    return res.send({ success: true, message: "Success", data: req.user });
}

module.exports = { register, login, logout, getMe };

// Password: 123 ==> #12hjgvasdbhjas*2 (Hased Password)