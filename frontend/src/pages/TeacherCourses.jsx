import React, { useState } from "react";
import "./TeacherCourses.css";
import Sidebar from "../components/TeacherSidebar";

const TeacherCourses = () => {

    const [showModal, setShowModal] = useState(false);

    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        thumbnail: "",
        trailerVideo: "",
        category: "",
        level: "beginner",
        language: "",
        requirements: "",
        learningOutcomes: "",
        totalDuration: "",
        totalLectures: "",
    });

    const handleChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const finalData = {
            ...courseData,

            requirements: courseData.requirements
                .split(",")
                .map((item) => item.trim()),

            learningOutcomes: courseData.learningOutcomes
                .split(",")
                .map((item) => item.trim()),
        };

        console.log(finalData);

        setShowModal(false);
    };

    return (
        <>
            <Sidebar />
            <div className="courses-page">

                {/* Header */}
                <div className="courses-header">

                    <div>
                        <h1>My Courses</h1>
                        <p>Manage and create your courses</p>
                    </div>

                    <button
                        className="add-course-btn"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Course
                    </button>

                </div>

                {/* Courses Grid */}
                <div className="courses-grid">
                </div>

                {/* Modal */}
                {
                    showModal && (
                        <div className="modal-overlay">

                            <div className="course-modal">

                                <div className="modal-header">
                                    <h2>Add New Course</h2>

                                    <button
                                        onClick={() => setShowModal(false)}
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit}>

                                    <div className="form-group">
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

                                    <div className="form-group">
                                        <label>Description</label>

                                        <textarea
                                            name="description"
                                            placeholder="Enter course description"
                                            value={courseData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-row">

                                        <div className="form-group">
                                            <label>Thumbnail URL</label>

                                            <input
                                                type="text"
                                                name="thumbnail"
                                                placeholder="Enter thumbnail URL"
                                                value={courseData.thumbnail}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Trailer Video URL</label>

                                            <input
                                                type="text"
                                                name="trailerVideo"
                                                placeholder="Enter trailer video URL"
                                                value={courseData.trailerVideo}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                    </div>

                                    <div className="form-row">

                                        <div className="form-group">
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

                                        <div className="form-group">
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

                                    <div className="form-row">

                                        <div className="form-group">
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

                                        <div className="form-group">
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

                                    <div className="form-group">
                                        <label>Total Lectures</label>

                                        <input
                                            type="number"
                                            name="totalLectures"
                                            placeholder="45"
                                            value={courseData.totalLectures}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Requirements</label>

                                        <textarea
                                            name="requirements"
                                            placeholder="Basic JavaScript, HTML, CSS"
                                            value={courseData.requirements}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Learning Outcomes</label>

                                        <textarea
                                            name="learningOutcomes"
                                            placeholder="Build Full Stack Apps, APIs, Authentication"
                                            value={courseData.learningOutcomes}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="submit-btn"
                                    >
                                        Create Course
                                    </button>

                                </form>

                            </div>

                        </div>
                    )
                }

            </div>
        </>
    );
};

export default TeacherCourses;