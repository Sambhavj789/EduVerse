function userValidator(req) {
    const { fullname, email, password, role } = req.body;
    const bio = req.body?.bio || "";
    const profileImage = req.file.filename;
    if (!fullname || !email || !password || !["student", "teacher"].includes(role) || !profileImage) {
        throw new Error("Required Fields Not Found");
    }
    return {
        fullname, email, password, role, bio, profileImage
    }
}

module.exports = userValidator;
// body: {email,password}
// req.body?.bio ==> undefined
// undefined || "" ==> "" (as undefined is false), (concept: Short Circuit Evaluation)