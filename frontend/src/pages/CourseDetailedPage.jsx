import { useParams } from "react-router-dom";
import "./CourseDetailedPage.css";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

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

function CourseDetailedPage() {
  const params = useParams();
  const [course, setCourse] = useState(demoCourse);
  const [isUserJoined, setIsUserJoined] = useState(false);
  const API_IMAGE_URL = "http://localhost:4000/uploads/";
  const courseId = params.courseId;
  const { user } = useUser();
  function handleButtonClicked(e) {
    joinCourse();
  }
  async function joinCourse() {
    try {
      if (!user) {
        toast.error("Login First To Join Course");
        return;
      }
      if (isUserJoined) {
        return;
      }
      const data = { studentId: user._id, courseId };
      const response = await api.post("/enrollement/join", data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data?.success) {
        toast.success("Course Joined Successfully");
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
        console.log(response.data?.data);
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
        // checking if user is joined in that particular course
        setIsUserJoined(response.data?.data);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Internal Server Error");
    }
  }

  useEffect(() => {
    getCourseData();
    checkIfStudentJoined();
  }, [user]);

  return (
    <div className="tcd-page">
      {/* Hero */}
      <div className="tcd-hero">
        <div className="tcd-image">
          <img src={API_IMAGE_URL + course.thumbnail} alt={course.title} />
        </div>

        <div className="tcd-info">
          <span className="tcd-category">{course.category}</span>

          <h1>{course.title}</h1>

          <p>{course.description}</p>

          <div className="tcd-stats">
            <div>
              <strong>{course.totalDuration}h</strong>
              <span>Duration</span>
            </div>

            <div>
              <strong>{course.totalLectures}</strong>
              <span>Lectures</span>
            </div>

            <div>
              <strong>{course.totalStudents}</strong>
              <span>Students</span>
            </div>
          </div>

          <div className="tcd-badges">
            <span>{course.level}</span>
            <span>{course.language}</span>
          </div>

          <div className="teacher-info">
            <div className="teacher-profile-image">
              <img
                src={API_IMAGE_URL + course.teacher?.profileImage}
                alt="teacher-image"
              />
            </div>
            <div className="teacher-details">
              <span>{course.teacher?.fullname}</span>
              <p className="teacher-bio">{course.teacher?.bio}</p>
            </div>
          </div>

          <div className="course-btn">
            <button onClick={handleButtonClicked}>
              {isUserJoined ? "View Course" : "Join Course"}
            </button>
          </div>
        </div>
      </div>

      {/* Trailer */}
      <div className="tcd-section">
        <h2>Course Trailer</h2>

        <div className="tcd-video">
          <iframe
            src={API_IMAGE_URL + course.trailerVideo}
            title="Course Trailer"
            allowFullScreen
          />
        </div>
      </div>

      {/* Description */}
      <div className="tcd-section">
        <h2>Course Description</h2>
        <p>{course.description}</p>
      </div>

      {/* Requirements */}
      <div className="tcd-section">
        <h2>Requirements</h2>

        <ul>
          {course.requirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Outcomes */}
      <div className="tcd-section">
        <h2>What Students Will Learn</h2>

        <div className="tcd-outcomes">
          {course.learningOutcomes.map((item, index) => (
            <div key={index} className="tcd-outcome">
              ✓ {item}
            </div>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div className="tcd-section">
        <h2>Course Modules</h2>

        <div className="tcd-modules">
          {course.modules.map((module, index) => (
            <div className="tcd-module-card" key={index}>
              <h3>{module.title}</h3>

              <div className="tcd-module-info">
                <span>{module.lectures} Lectures</span>
                <span>{module.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDetailedPage;
