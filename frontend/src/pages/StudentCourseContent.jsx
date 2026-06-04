import React, { useEffect, useState } from "react";
import "./StudentCourseContent.css";
import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";

function StudentCourseContent() {
  const [expandedChapter, setExpandedChapter] = useState(null);

  // Modals
  const [showChapterModal, setShowChapterModal] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const moduleId = params.moduleId;

  const [chapters, setChapters] = useState([]);
  const [moduleData,setModuleData] = useState({});
  const [courseId,setCourseId] = useState(null);
  const IMAGE_API_URL = "http://localhost:4000/uploads/"
  function toggleChapter(id) {
    if (expandedChapter === id) {
      setExpandedChapter(null);
    } else {
      setExpandedChapter(id);
    }
  }
  async function getModuleData() {
    try {
      const response = await api.get(`/modules/single-module/${moduleId}`);
      if (response.data?.success) {
        const moduleCourse = response.data?.data?.course;
        setCourseId(
          typeof moduleCourse === "string" ? moduleCourse : moduleCourse?._id,
        );
        setChapters(response.data?.data?.chapters);
        setModuleData(response.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getModuleData();
  }, []);

  return (
    <div className="course-content-page">
      {/* Header */}
      <div className="content-header">
        <div>
          <div className="back-btn">
            <IoMdArrowRoundBack onClick={() => navigate(-1)} />
          </div>
          <h1>{moduleData.title} Module</h1>
        </div>
      </div>

      {/* Chapters */}
      <div className="chapters-container">
        {chapters.map((chapter) => {
          const isOpen = expandedChapter === chapter._id;

          return (
            <div className="chapter-card" key={chapter._id}>
              {/* Header */}
              <div
                className="chapter-header"
                onClick={() => toggleChapter(chapter._id)}
              >
                <div className="chapter-left">
                  {isOpen ? (
                    <FaChevronDown className="arrow-icon" />
                  ) : (
                    <FaChevronRight className="arrow-icon" />
                  )}

                  <div>
                    <h2>{chapter.title}</h2>

                    <p>{chapter.lectures.length} Lectures</p>
                  </div>
                </div>
              </div>

              {/* Lectures */}
              {isOpen && (
                <div className="lectures-container">
                  {chapter.lectures.map((lecture, index) => {
                    return (
                      <div
                        className="lecture-card"
                        key={index}
                        onClick={() => {
                          navigate(`/student/course/${courseId}/lecture-detail/${lecture._id}`);
                        }}
                      >
                        <span className="lecture-number">{index + 1}</span>
                        <div className="st-cc-lecture-thumbnail">
                            <img src={IMAGE_API_URL + lecture.thumbnail} alt={lecture.title} />
                        </div>
                        <div>
                          <h3>{lecture.title}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentCourseContent;
