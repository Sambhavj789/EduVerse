import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaGlobe,
  FaLayerGroup,
  FaPlayCircle,
  FaSignal,
  FaUsers,
} from "react-icons/fa";

import api from "../utils/api";
import { useUser } from "../context/UserContext";

import "./CourseDetailedPage.css";

const demoCourse = {
  title: "Complete MERN Stack Development",
  description:
    "Learn React, Node.js, Express, MongoDB and build production ready applications from scratch.",
  thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  trailerVideo: "https://www.youtube.com/embed/dGcsHMXbSOA",
  category: "Web Development",
  level: "intermediate",
  language: "English",
  totalDuration: 42,
  totalLectures: 120,
  totalStudents: 1845,
  requirements: ["Basic HTML", "Basic CSS", "Basic JavaScript"],
  learningOutcomes: [
    "Build Full Stack Applications",
    "Authentication & Authorization",
    "REST APIs",
    "Deploy Applications",
  ],
  modules: [
    {
      title: "Introduction To MERN",
      lectures: 5,
      duration: "1h 20m",
    },
    {
      title: "React Fundamentals",
      lectures: 15,
      duration: "5h 30m",
    },
    {
      title: "Backend Development",
      lectures: 20,
      duration: "8h",
    },
    {
      title: "MongoDB Complete Guide",
      lectures: 12,
      duration: "4h",
    },
  ],
};

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => String(item).split(","))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function CourseDetailedPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [course, setCourse] = useState(demoCourse);
  const [isUserJoined, setIsUserJoined] = useState(false);

  const courseId = params.courseId;
  const API_IMAGE_URL = "http://localhost:4000/uploads/";

  const teacherImage = course.teacher?.profileImage
    ? `${API_IMAGE_URL}${course.teacher.profileImage}`
    : `https://ui-avatars.com/api/?background=2563ff&color=ffffff&name=${encodeURIComponent(
        course.teacher?.fullname || "EduVerse",
      )}`;

  const courseImage = course.thumbnail?.startsWith("http")
    ? course.thumbnail
    : `${API_IMAGE_URL}${course.thumbnail}`;

  const trailerUrl = course.trailerVideo?.startsWith("http")
    ? course.trailerVideo
    : `${API_IMAGE_URL}${course.trailerVideo}`;
  const requirements = normalizeList(course.requirements);
  const learningOutcomes = normalizeList(course.learningOutcomes);

  async function joinCourse() {
    try {
      if (!user) {
        toast.error("Login First To Join Course");
        return;
      }

      if (isUserJoined) {
        navigate(`/student/course/${courseId}/modules`);
        return;
      }

      const data = { studentId: user._id, courseId };
      const response = await api.post("/enrollement/join", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data?.success) {
        toast.success("Course Joined Successfully");
        setIsUserJoined(true);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Internal Server Error");
    }
  }

  async function getCourseData() {
    try {
      const response = await api.get(`/course/${courseId}`);
      if (response.data?.success) {
        setCourse(response.data?.data);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Internal Server Error");
    }
  }

  async function checkIfStudentJoined() {
    try {
      if (!user) {
        return;
      }

      const response = await api.get(`/course/is-student-joined/${courseId}`);
      if (response.data?.success) {
        setIsUserJoined(Boolean(response.data?.data));
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Internal Server Error");
    }
  }

  useEffect(() => {
    getCourseData();
  }, [courseId]);

  useEffect(() => {
    checkIfStudentJoined();
  }, [courseId, user]);

  const highlights = [
    {
      icon: <FaClock />,
      value: `${course.totalDuration || 0}h`,
      label: "Duration",
    },
    {
      icon: <FaPlayCircle />,
      value: course.totalLectures || 0,
      label: "Lectures",
    },
    {
      icon: <FaUsers />,
      value: course.totalStudents || 0,
      label: "Students",
    },
    {
      icon: <FaLayerGroup />,
      value: course.modules?.length || 0,
      label: "Modules",
    },
  ];

  return (
    <div className="tcd-page">
      <div className="tcd-breadcrumb">
        <span onClick={() => navigate("/courses")}>Courses</span>
        <span>/</span>
        <span>{course.category || "Course"}</span>
      </div>

      <div className="tcd-hero">
        <div className="tcd-image">
          <img src={courseImage} alt={course.title} />

          <div className="tcd-image-overlay">
            <span>{course.category || "Course"}</span>
            <strong>{course.level || "beginner"}</strong>
          </div>
        </div>

        <div className="tcd-info">
          <span className="tcd-category">{course.category}</span>
          <h1>{course.title}</h1>
          <p>{course.description}</p>

          <div className="tcd-stats">
            {highlights.map((item) => (
              <div key={item.label}>
                <span className="tcd-stat-icon">{item.icon}</span>
                <strong>{item.value}</strong>
                <small>{item.label}</small>
              </div>
            ))}
          </div>

          <div className="tcd-badges">
            <span>
              <FaSignal />
              {course.level}
            </span>
            <span>
              <FaGlobe />
              {course.language}
            </span>
            <span>
              <FaBookOpen />
              {course.modules?.length || 0} Modules
            </span>
          </div>

          <div className="teacher-info">
            <div className="teacher-profile-image">
              <img src={teacherImage} alt="teacher-image" />
            </div>

            <div className="teacher-details">
              <small>Instructor</small>
              <span>{course.teacher?.fullname}</span>
              <p className="teacher-bio">{course.teacher?.bio}</p>
            </div>
          </div>

          <div className="course-btn">
            <button onClick={joinCourse}>
              {isUserJoined ? "View Course" : "Join Course"}
            </button>

            <p>
              {isUserJoined
                ? "You are already enrolled in this course."
                : "Join now to unlock modules, lectures, resources, and quizzes."}
            </p>
          </div>
        </div>
      </div>

      <div className="tcd-grid-layout">
        <div className="tcd-main-column">
          <div className="tcd-section">
            <h2>Course Trailer</h2>

            <div className="tcd-video">
              <iframe src={trailerUrl} title="Course Trailer" allowFullScreen />
            </div>
          </div>

          <div className="tcd-section">
            <h2>Course Description</h2>
            <p>{course.description}</p>
          </div>

          <div className="tcd-section">
            <h2>What Students Will Learn</h2>

            <div className="tcd-outcomes">
              {learningOutcomes.map((item, index) => (
                <div key={index} className="tcd-outcome">
                  <FaCheckCircle />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tcd-section">
            <div className="tcd-section-head">
              <div>
                <h2>Course Modules</h2>
                <p>{course.modules?.length || 0} structured learning modules</p>
              </div>
            </div>

            <div className="tcd-modules">
              {course.modules.map((module, index) => (
                <div className="tcd-module-card" key={index}>
                  <div className="tcd-module-index">{index + 1}</div>

                  <div className="tcd-module-body">
                    <h3>{module.title}</h3>

                    <div className="tcd-module-info">
                      <span>{module.lectures || 0} Lectures</span>
                      <span>{module.duration || "Flexible"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="tcd-side-column">
          <div className="tcd-section tcd-side-card">
            <h2>Requirements</h2>

            <ul className="tcd-list">
              {requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="tcd-section tcd-side-card">
            <h2>Quick Facts</h2>

            <div className="tcd-quick-facts">
              <div>
                <span>Category</span>
                <strong>{course.category}</strong>
              </div>

              <div>
                <span>Level</span>
                <strong>{course.level}</strong>
              </div>

              <div>
                <span>Language</span>
                <strong>{course.language}</strong>
              </div>

              <div>
                <span>Students</span>
                <strong>{course.totalStudents || 0}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailedPage;
