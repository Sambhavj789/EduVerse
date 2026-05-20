const jwt = require("jsonwebtoken");
const User = require("../models/User");
async function authMiddleware(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).send({ success: false, message: "Token Not Found" });
    }
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const id = userData.id;
    const user = await User.findById(id).select("-password");
    if (!user) {
        return res.status(404).send({ success: false, message: "User Not Found" });
    }
    req.user = user;
    next();
}

module.exports = authMiddleware;
// thrid party middleware : cookie-parser (it allows our backend to parse the cokkies)