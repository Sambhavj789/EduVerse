const multer = require("multer");
const path = require("path");
const fs = require("fs");
const fileDestination = path.join(__dirname, "../../uploads/");
if (!fs.existsSync(fileDestination)) {
    fs.mkdirSync(fileDestination);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, fileDestination);
    },
    filename: function (req, file, cb) {
        const uniqueFileName = Date.now() + "-" + file.originalname;
        cb(null, uniqueFileName);
    }
})
const upload = multer({ storage: storage });
module.exports = upload;
// route.js uploaded by user1 at 15-05-26 15:25:32
// routes.js uploaded by user2