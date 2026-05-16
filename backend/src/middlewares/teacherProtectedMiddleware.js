function teacherProtectedMiddleware(req, res, next) {
    const user = req.user;
    if (!["teacher", "admin"].includes(user.role)) {
        return res.status(401).send({ success: false, message: "Unauthorised Access" });
    }
    next();
}

module.exports = teacherProtectedMiddleware;