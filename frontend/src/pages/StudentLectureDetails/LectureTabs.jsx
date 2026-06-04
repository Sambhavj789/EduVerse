import {
  FaVideo,
  FaQuestionCircle,
  FaFileAlt,
} from "react-icons/fa";

function LectureTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="lecture-tabs">

      <button
        className={
          activeTab === "video"
            ? "active-tab"
            : ""
        }
        onClick={() =>
          setActiveTab("video")
        }
      >
        <FaVideo />
        Video
      </button>

      <button
        className={
          activeTab === "quiz"
            ? "active-tab"
            : ""
        }
        onClick={() =>
          setActiveTab("quiz")
        }
      >
        <FaQuestionCircle />
        Quiz
      </button>

      <button
        className={
          activeTab === "resources"
            ? "active-tab"
            : ""
        }
        onClick={() =>
          setActiveTab("resources")
        }
      >
        <FaFileAlt />
        Resources
      </button>

    </div>
  );
}

export default LectureTabs;