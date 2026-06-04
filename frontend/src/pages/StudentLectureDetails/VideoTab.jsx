import { FaPlayCircle } from "react-icons/fa";

function VideoTab({
  lectureVideoUrl,
  lectureTitle,
  lectureDescription,
}) {
  return (
    <div className="video-tab-container">

      <div className="video-player-card">

        <div className="video-player-header">
          <div>
            <h2>
              <FaPlayCircle />
              Lecture Video
            </h2>

            <p>
              Watch the lecture carefully before
              attempting the quiz.
            </p>
          </div>
        </div>

        <div className="video-wrapper">
          <video
            controls
            controlsList="nodownload"
            className="lecture-video"
          >
            <source
              src={lectureVideoUrl}
              type="video/mp4"
            />
          </video>
        </div>

      </div>

      <div className="video-info-card">
        <h2>{lectureTitle}</h2>

        <p>
          {lectureDescription}
        </p>
      </div>

    </div>
  );
}

export default VideoTab;