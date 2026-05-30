import React from "react";
import "./CourseCard.css";

import { GrWifiLow, GrWifiMedium, GrWifi } from "react-icons/gr";
import { FaStar } from "react-icons/fa";

function CourseCard({ data, mode, onClick }) {
  function levelIcon(level) {
    if (level === "beginner") {
      return <GrWifiLow className="level-icon" />;
    }

    if (level === "intermediate") {
      return <GrWifiMedium className="level-icon" />;
    }

    return <GrWifi className="level-icon" />;
  }

  const IMAGE_URL = "http://localhost:4000/uploads/";

  const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80";

  const imageSrc = data.thumbnail?.startsWith("http")
    ? data.thumbnail
    : data.thumbnail
    ? IMAGE_URL + data.thumbnail
    : FALLBACK_IMAGE;

  const teacherAvatar = `https://ui-avatars.com/api/?background=2563ff&color=ffffff&name=${encodeURIComponent(
    data.teacher || "EduVerse"
  )}`;

  return (
    <div className="course-card">
      <div className="course-img">
        <img src={imageSrc} alt={data.title} />

        <div className="course-category">
          {data.category || "Course"}
        </div>
      </div>

      <div className="course-body">
        <h2 className="course-title">{data.title}</h2>

        {data.description && (
          <p className="course-description">{data.description}</p>
        )}
        <div className="course-level">
          {levelIcon(data.level)}
          <span className="level-text">
            {data.level} Level
          </span>
        </div>

        {mode === "normal" && (
          <div className="course-teacher">
            <img src={teacherAvatar} alt="" />

            <div className="teacher-details">
              <h4>{data.teacher}</h4>
              <span>Verified Instructor</span>
            </div>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button
          className="view-course"
          onClick={onClick}
        >
          View Course
        </button>
      </div>
    </div>
  );
}

export default CourseCard;