function lectureValidator(req, mode = "add") {
  let chapter;
  if (mode == "add") {
    chapter = req.body.chapter;
  }
  const { title, description, textContent } = req.body;
  const thumbnail = req.files?.thumbnail?.[0]?.filename;
  const videoUrl = req.files?.videoUrl?.[0]?.filename;
  const duration = req.body?.duration || 0;
  if (mode == "add" && !chapter) {
    throw new Error("Required Fields Not Found");
    return;
  }
  if (!title || !description) {
    throw new Error("Required Fields Not Found");
    return;
  }
  return {
    chapter,
    title,
    description,
    duration,
    textContent,
    thumbnail,
    videoUrl,
  };
}

module.exports = lectureValidator;
