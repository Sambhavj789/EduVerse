import React, { useEffect, useState } from "react";
import "./TeacherCourses.css";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

const TeacherCourses = () => {
  const initialCourseData = {
    title: "",
    description: "",
    thumbnail: null,
    trailerVideo: null,
    category: "",
    level: "beginner",
    language: "",
    requirements: "",
    learningOutcomes: "",
    totalDuration: "",
    totalLectures: "",
  };
  const [showModal, setShowModal] = useState(false);

  const [courseData, setCourseData] = useState(initialCourseData);
  const [courses, setCourses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  function parseCommaSeparated(value) {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  async function getAllCoursesByTeacher() {
    try {
      if (!user?._id) {
        return;
      }

      const response = await api.get(`/course/teacher-courses/${user._id}`);
      if (response.data?.success) {
        setCourses(response.data?.data);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data?.message || "Internal Server Error");
    }
  }

  useEffect(() => {
    getAllCoursesByTeacher();
  }, [user]);

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);

      const requirements = parseCommaSeparated(courseData.requirements);
      const learningOutcomes = parseCommaSeparated(courseData.learningOutcomes);

      if (!requirements.length || !learningOutcomes.length) {
        toast.error("Requirements and learning outcomes are required");
        return;
      }

      const finalData = {
        ...courseData,
        requirements,
        learningOutcomes,
        teacher: user._id,
      };

      const formData = new FormData();
      for (let field in finalData) {
        if (field === "requirements" || field === "learningOutcomes") {
          formData.append(field, JSON.stringify(finalData[field]));
          continue;
        }

        formData.append(field, finalData[field]);
      }

      const response = await api.post("/course/create", formData);
      if (response.data?.success) {
        toast.success(response.data?.message);
        const newCourse = response.data?.courseData;
        setCourses([...courses, newCourse]);
        setCourseData(initialCourseData);
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Internal Server Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleFileChange(e) {
    const name = e.target.name;
    const file = e.target.files[0];
    setCourseData({ ...courseData, [name]: file });
  }

  function handleCourseClick(data) {
    const courseId = data._id;
    navigate(`/teacher/course-modules/${courseId}`);
  }

  return (
    <>
      <div className="tc-page">
        {/* Header */}
        <div className="tc-header">
          <div>
            <h1>My Courses</h1>
            <p>Manage and create your courses</p>
          </div>

          <button className="tc-add-btn" onClick={() => setShowModal(true)}>
            + Add Course
          </button>
        </div>

        {/* Courses Grid */}
        <div className="tc-grid">
          {courses.length ? (
            courses.map((data, index) => (
              <CourseCard
                key={index}
                data={data}
                mode="teacher"
                onClick={() => handleCourseClick(data)}
              />
            ))
          ) : (
            <div className="tc-empty-state">
              <h3>No courses yet</h3>
              <p>Create your first course to start building modules, chapters, and lectures.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="tc-modal-overlay">
            <div className="tc-modal">
              <div className="tc-modal-header">
                <div>
                  <h2>Create New Course</h2>
                  <p>Set up the course basics, media, and student outcomes.</p>
                </div>

                <button
                  className="tc-close-btn"
                  onClick={() => setShowModal(false)}
                  type="button"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="tc-form-section">
                  <div className="tc-section-title">
                    <h3>Core Details</h3>
                    <p>These details are shown to students before they join.</p>
                  </div>

                <div className="tc-form-group">
                  <label>Course Title</label>

                  <input
                    type="text"
                    name="title"
                    placeholder="Enter course title"
                    value={courseData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tc-form-group">
                  <label>Description</label>

                  <textarea
                    name="description"
                    placeholder="Enter course description"
                    value={courseData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                </div>

                <div className="tc-form-section">
                  <div className="tc-section-title">
                    <h3>Media</h3>
                    <p>Upload a clean thumbnail and a trailer video for the preview page.</p>
                  </div>

                <div className="tc-form-row">
                  <div className="tc-form-group">
                    <label>Thumbnail</label>

                    <input
                      type="file"
                      name="thumbnail"
                      onChange={handleFileChange}
                      required
                    />
                    <small>Best for cards and course landing preview.</small>
                  </div>

                  <div className="tc-form-group">
                    <label>Trailer Video</label>

                    <input
                      type="file"
                      name="trailerVideo"
                      onChange={handleFileChange}
                      required
                    />
                    <small>Upload a short trailer so students can preview the course.</small>
                  </div>
                </div>
                </div>

                <div className="tc-form-section">
                  <div className="tc-section-title">
                    <h3>Metadata</h3>
                    <p>Use accurate tags so students can find the course easily.</p>
                  </div>

                <div className="tc-form-row">
                  <div className="tc-form-group">
                    <label>Category</label>

                    <input
                      type="text"
                      name="category"
                      placeholder="Web Development"
                      value={courseData.category}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="tc-form-group">
                    <label>Language</label>

                    <input
                      type="text"
                      name="language"
                      placeholder="English"
                      value={courseData.language}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="tc-form-row">
                  <div className="tc-form-group">
                    <label>Level</label>

                    <select
                      name="level"
                      value={courseData.level}
                      onChange={handleChange}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advance">Advance</option>
                    </select>
                  </div>

                  <div className="tc-form-group">
                    <label>Total Duration (Hours)</label>

                    <input
                      type="number"
                      name="totalDuration"
                      placeholder="20"
                      value={courseData.totalDuration}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="tc-form-row">
                  <div className="tc-form-group">
                    <label>Total Lectures</label>

                    <input
                      type="number"
                      name="totalLectures"
                      placeholder="45"
                      value={courseData.totalLectures}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="tc-form-preview-card">
                    <span>Quick Preview</span>
                    <strong>{courseData.title || "Untitled Course"}</strong>
                    <p>
                      {courseData.category || "Category"} • {courseData.level || "Level"} • {courseData.language || "Language"}
                    </p>
                  </div>
                </div>
                </div>

                <div className="tc-form-section">
                  <div className="tc-section-title">
                    <h3>Student Value</h3>
                    <p>Separate each item with a comma. Every point will show as its own bullet/chip.</p>
                  </div>

                <div className="tc-form-group">
                  <label>Requirements</label>

                  <textarea
                    name="requirements"
                    placeholder="Basic JavaScript, HTML, CSS"
                    value={courseData.requirements}
                    onChange={handleChange}
                  />
                  <small>{parseCommaSeparated(courseData.requirements).length} requirement item(s)</small>
                </div>

                <div className="tc-form-group">
                  <label>Learning Outcomes</label>

                  <textarea
                    name="learningOutcomes"
                    placeholder="Build Full Stack Apps, APIs, Authentication"
                    value={courseData.learningOutcomes}
                    onChange={handleChange}
                  />
                  <small>{parseCommaSeparated(courseData.learningOutcomes).length} outcome item(s)</small>
                </div>
                </div>

                <div className="tc-form-actions">
                  <button type="button" className="tc-secondary-btn" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>

                  <button type="submit" className="tc-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TeacherCourses;
