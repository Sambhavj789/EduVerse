import React, { useEffect, useState, useRef } from "react";
import "./StudentLectureDetail.css";
import {
  FaVideo,
  FaQuestionCircle,
  FaFileAlt,
  FaUpload,
  FaPlus,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";

function StudentLectureDetails() {
  const [activeTab, setActiveTab] = useState("video");
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const lectureId = params.lectureId;

  const [quizTitle, setQuizTitle] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [openQuiz, setOpenQuiz] = useState(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureThumbnail, setLectureThumbnail] = useState(null);
  const [lectureDescription, setLectureDesciprtion] = useState("");
  const [lectureDuration, setLectureDuration] = useState("");
  const [resourceType, setResourceType] = useState("text");
  const [resourceText, setResourceText] = useState("");
  const [oldThumbnail, setOldThumbnail] = useState(null);
  const [oldVideoUlr, setOldVideoUrl] = useState(null);
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceFile, setResourceFile] = useState(null);
  const thumbnailRef = useRef();
  const videoRef = useRef();
  const [resources, setResources] = useState([]);
  const [fileResouces, setFileResouces] = useState([]);
  const [textResouces, setTextResources] = useState([]);

  async function getLectureDetails() {
    try {
      const response = await api.get(`/lectures/${lectureId}`);
      if (response.data?.success) {
        const data = response.data?.data;
        setLectureTitle(data.title);
        setLectureDesciprtion(data.description);
        setLectureDuration(data.duration);
        setOldThumbnail(data.thumbnail);
        setOldVideoUrl(data.videoUrl);
        setQuizzes(data.quizes);
        const resources = data?.materials;
        setFileResouces(
          resources.filter((resource) => resource.type == "file"),
        );
        setTextResources(
          resources.filter((resource) => resource.type == "text"),
        );
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Internal Server Error");
    }
  }

  useEffect(() => {
    getLectureDetails();
  }, []);

  const IMAGE_API_URL = "http://localhost:4000/uploads/";
  const LECTURE_VIDEO_URL = `http://localhost:4000/api/v1/lectures/video/stream/${lectureId}`;
  function handleFileOpen(fileUrl) {
    window.open(IMAGE_API_URL + fileUrl, "_blank");
  }

  return (
    <div className="st-lecture-details-page">
      {/* Top Header */}
      <div className="st-lecture-top">
        <div>
          <div className="back-btn">
            <IoMdArrowRoundBack onClick={() => navigate(-1)} />
          </div>
          <h1>{lectureTitle}</h1>
          <p>{lectureDescription}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="lecture-tabs">
        <button
          className={activeTab === "video" ? "active-tab" : ""}
          onClick={() => setActiveTab("video")}
        >
          <FaVideo />
          Video
        </button>

        <button
          className={activeTab === "quiz" ? "active-tab" : ""}
          onClick={() => setActiveTab("quiz")}
        >
          <FaQuestionCircle />
          Quiz
        </button>

        <button
          className={activeTab === "resources" ? "active-tab" : ""}
          onClick={() => setActiveTab("resources")}
        >
          <FaFileAlt />
          Resources
        </button>
      </div>

      {/* VIDEO TAB */}
      {activeTab === "video" && (
        <div className="tab-content">
          <div className="st-content-card">
            <video controls controlsList="nodownload" className="lecture-video">
              <source src={LECTURE_VIDEO_URL} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* QUIZ TAB */}
      {activeTab === "quiz" && (
        <div className="tab-content">
          <div className="content-card">
            <div className="section-header">
              <h2>All Quizzes</h2>
            </div>
          </div>

          {/* Quiz List */}
          <div className="items-list">
            {quizzes.map((quiz, index) => {
              return (
                <div className="list-card" key={index}>
                  <div>
                    <h3>{quiz.title}</h3>
                    <p>Quiz #{index + 1}</p>
                  </div>
                  <button
                    className="attempt-quiz-button"
                    onClick={() => {
                      setOpenQuiz(quiz);
                    }}
                  >
                    Attempt
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* RESOURCES TAB */}
      {activeTab === "resources" && (
        <div className="tab-content">
          {/* Resources List */}
          <div className="items-list">
            {[...textResouces, ...fileResouces].map((resource, index) => {
              return (
                <div className="list-card" key={index}>
                  <div>
                    <h3>{resource.title}</h3>
                    <p>Resource #{index + 1}</p>
                    {resource.type === "text" ? (
                      <p className="resource-preview">{resource.textContent}</p>
                    ) : (
                      <p className="resource-preview">{resource.file?.name}</p>
                    )}
                  </div>

                  {resource.type == "file" && (
                    <div className="lecture-view-btn">
                      <button onClick={() => handleFileOpen(resource.fileUrl)}>
                        View
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Attempt Quiz Model */}
      {openQuiz && (
        <div className="ateempt-quiz-model-overlay">
          <div className="attempt-quiz-model">
            <div className="tc-modal-header">
              <h2>{openQuiz.title}</h2>

              <button
                className="tc-close-btn"
                onClick={() => setOpenQuiz(null)}
                type="button"
              >
                ✕
              </button>
            </div>

            <div className="questions-progress">
              {openQuiz?.questions?.map((_, index) => {
                return (
                  <div className="question-step active-step" key={index}>
                    Q{index + 1}
                  </div>
                );
              })}
            </div>

            <div className="quiz-question-body">
              <div className="quiz-question-title">
                {openQuiz?.questions[currentQuestionNumber].question}
              </div>

              <div className="quiz-question-options-grid">
                {openQuiz?.questions[currentQuestionNumber]?.options?.map(
                  (option,index) => {
                    return <div className="quiz-question-option-card" key={index}>
                      <div className="quiz-question-option-top">
                        <h3>{option}</h3>

                        <button type="button" className="correct-btn">
                          <FaCheckCircle />
                        </button>
                      </div>
                    </div>;
                  },
                )}
              </div>

              <div className="quiz-question-move-btns">
                <button>Prev</button>
                <button>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentLectureDetails;
